# SmartBank Connector Service — Design Spec

**Tanggal:** 2026-06-23 · **Revisi:** 2026-07-03
**Status:** Revised — OTP flow, payment flow, PIN integration
**Owner:** SmartBank Architecture
**Scope:** Connector service + CentralBank internal endpoints + SmartBank wallet inbox UI

---

## 1. Overview

SmartBank saat ini punya 4 service (Central-Bank, Wallet, Gateway, Frontend) dan **konsep** 5 sister apps (Marketplace, POS, SupplierHub, LogistiKita, UMKM Insight) yang belum ada di codebase. Spec ini merancang **Connector service** sebagai bridge resmi antara SmartBank dan sister apps, sehingga:

- Sister apps punya channel pembayaran resmi (SmartBank = first-party payment provider)
- SmartBank punya audit trail + kontrol atas siapa yang akses apa
- User punya pengalaman OTP/inbox yang konsisten di semua touchpoint (sister app + SmartBank wallet)

**Outcome yang diharapkan:**
- Sister app bisa daftarkan user-nya → dapat SmartBank wallet
- Sister app bisa terima pembayaran dari user-nya → settle di CentralBank ledger
- User bisa cek OTP + notifikasi transaksi via SmartBank wallet inbox

---

## 2. Decisions Summary (Hasil Brainstorming)

| # | Pertanyaan | Keputusan | Alasan |
|---|---|---|---|
| 1 | Arsitektur konektor | **A. Service baru (:5000)** | Separation of concerns, independent scaling, future-proof untuk partner eksternal |
| 2 | Identity model | **C. Hybrid — user harus sudah punya SmartBank wallet** | User daftar via SmartBank Wallet app dulu. Connector hanya link existing wallet ke sister app. Menghindari pembuatan user tanpa consent |
| 3 | OTP delivery | **Inbox SmartBank wallet** (bukan API retrieval) | Security: user consent, anti-phishing. Sister app tidak boleh retrieve OTP — OTP hanya muncul di SmartBank app yang user punya |
| 4 | Inbox display | **C. Full inbox + UI** | User lihat OTP linking + notifikasi transaksi di SmartBank wallet inbox (real product feel) |
| 5 | Phone normalization | **`libphonenumber-js`** | Comprehensive E.164 + masking, MIT license, zero deps |
| 6 | JWT library | **`jsonwebtoken`** (konsisten) | Seluruh stack (CentralBank via @nestjs/jwt, Gateway, Wallet) udah pakai ini |
| 7 | Polling interval | **10s (kompromi)** | 15s terasa lambat untuk OTP (TTL 5 menit), 5s terlalu agresif untuk MVP |
| 8 | OTP format | **6 digit numeric** | Standar perbankan Indonesia, familiar user, kurang error-prone dibanding alphanumeric |
| 9 | API key rotation | **Multiple active keys per service** | Enable seamless rotasi tanpa downtime |
| 10 | Admin UI path | **`/admin/connector`** — ikut pola existing | Frontend udah punya pola baku AppShell → RolePage → AdminComponent |
| 11 | Unlink strategy | **Soft delete** (`unlinked_at`) | Preserve audit trail, enable re-link idempotent |
| 12 | Notification retention | **90 hari** | Cukup untuk MVP, index created_at siap untuk cleanup job nanti |
| 13 | Webhook ke sister app | **Skip MVP, tetap Phase 3** | Complexity tinggi (retry queue, delivery tracking), sister app bisa polling |
| 14 | KYC tier upgrade | **CentralBank admin only** | Teller service existing sudah mature, connector cukup read-only |
| 15 | Otorisasi pembayaran | **PIN transaksi** | Sesuai domain rules: PIN untuk transaksi finansial. Bukan OTP. PIN divalidasi CentralBank |
| 16 | Payment settlement | **Internal endpoint atomic** (`POST /api/v1/internal/payment-requests/settle`) | Single step settlement via service JWT + user delegation. Hindari 2-step PENDING→PAY yang butuh user JWT |

**Topology deployment:** Opsi 3 — SmartBank sebagai Payment-as-a-Service, sister apps adalah first-party consumers (mostly external). Auth via per-service API key.

---

## 3. Goals & Non-Goals

### Goals
1. ✅ Sister apps bisa menghubungkan user mereka ke SmartBank wallet (linking via phone + OTP)
2. ✅ Sister apps bisa forward payment request → settle atomically di CentralBank (via internal endpoint)
3. ✅ User verifikasi kepemilikan nomor HP via OTP yang muncul di **inbox SmartBank wallet** (bukan di sister app)
4. ✅ User mengotorisasi pembayaran via **PIN transaksi** (bukan OTP)
5. ✅ User bisa lihat OTP linking + notifikasi transaksi di SmartBank wallet inbox
6. ✅ Audit trail immutable untuk compliance
7. ✅ Idempotent di semua endpoint (aman retry)
8. ✅ Rate limiting anti-abuse
9. ✅ Health check + readiness untuk orchestration

### Non-Goals (di luar scope spec ini)
- ❌ Push notification real-time ke device (gunakan polling untuk MVP)
- ❌ Real SMS gateway integration (simulasi via response API)
- ❌ Biometric / device binding (TBD Phase 3)
- ❌ Multi-currency (hanya CBDC_IDR)
- ❌ Production-grade secret management (pakai env var untuk MVP)
- ❌ Sister app admin dashboard (CRUD service via API saja)
- ❌ Migration tools untuk sister apps existing (mereka implement sendiri)

---

## 4. Architecture

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   SISTER APPS (Marketplace, POS, Supplier, Logistik, UMKM Insight)      │
│   ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                │
│   │ Marketplace UI │ │   POS UI       │ │  Supplier UI   │  ...           │
│   └────────┬───────┘ └────────┬───────┘ └────────┬───────┘                │
│            │ API key          │ API key          │ API key                │
│            ▼                  ▼                  ▼                         │
│   ┌─────────────────────────────────────────────────────┐                │
│   │  CONNECTOR SERVICE :5000       [NEW]                 │                │
│   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │                │
│   │  │ API Layer   ││ Linkage Svc ││ OTP Service  │    │                │
│   │  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘    │                │
│   │         │              │              │              │                │
│   │  ┌──────┴──────────────┴──────────────┴──────┐       │                │
│   │  │     CentralBank Client (HTTP + retry)     │       │                │
│   │  └──────────────────┬───────────────────────┘       │                │
│   │                     │ service JWT                   │                │
│   └─────────────────────┼───────────────────────────────┘                │
│                         │                                                │
│   ┌─────────────────────┼───────────────────────────────┐                │
│   │  CENTRAL-BANK :3000 │      [MODIFIED]                │                │
│   │  ┌──────────────────┴───────────────────────┐       │                │
│   │  │  Auth, Settlement, Ledger, Fee, Loans     │       │                │
│   │  │  + NEW: Notification Service              │       │                │
│   │  │  + NEW: Internal Settlement Endpoint      │       │                │
│   │  │  + NEW: Phone Lookup (resolve user)       │       │                │
│   │  └──────────────────┬───────────────────────┘       │                │
│   │                     │                                │                │
│   │  ┌──────────────────┴───────────────────────┐       │                │
│   │  │  MySQL: central_bank_core                │       │                │
│   │  │  + NEW TABLE: notifications              │       │                │
│   │  └──────────────────────────────────────────┘       │                │
│   └─────────────────────┬───────────────────────────────┘                │
│                         │ user JWT (inbox polling)                        │
│                         ▼                                                │
│   ┌─────────────────────────────────────────────────────┐                │
│   │  FRONTEND :3001     [MODIFIED — add /inbox page]     │                │
│   │  (Next.js) — SmartBank Wallet UI                     │                │
│   │  + NEW: NotificationBell, NotificationList           │                │
│   │  + NEW: OTP detail view (kode + countdown timer)    │                │
│   └─────────────────────────────────────────────────────┘                │
│                                                                          │
│   Note: User harus daftar SmartBank Wallet dulu (via frontend),          │
│         baru bisa di-link ke sister app via connector.                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Tech stack:**
- Connector: Node.js 20 + Express + Prisma + MySQL + `libphonenumber-js` + `jsonwebtoken` (konsisten)
- CentralBank mod: tambah notification module (NestJS service + Prisma migration)
- Frontend mod: tambah inbox page (Next.js 14, sudah pakai)
- Shared: semua pake TypeScript strict

---

## 5. Components

### 5.1 Connector Service (NEW)

```
Connector/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── api/
│   │   ├── users.routes.ts        # /v1/connect/users/*
│   │   ├── otp.routes.ts          # /v1/connect/users/otp/*
│   │   ├── payments.routes.ts     # /v1/connect/payment-requests/*
│   │   ├── admin.routes.ts        # /v1/connect/admin/*
│   │   └── health.routes.ts       # /health, /ready
│   ├── middleware/
│   │   ├── auth.ts                # API key validation
│   │   ├── rateLimit.ts           # per-service rate limit
│   │   ├── idempotency.ts         # Idempotency-Key check
│   │   └── errorHandler.ts        # unified error response
│   ├── services/
│   │   ├── linkage.service.ts     # phone → wallet_id resolution, link/unlink
│   │   ├── otp.service.ts         # generate OTP, dispatch ke CentralBank inbox
│   │   ├── payment.service.ts     # forward payment ke CentralBank internal settlement
│   │   ├── audit.service.ts       # immutable audit log
│   │   └── notification-dispatcher.service.ts  # call CentralBank notif API
│   ├── integrations/
│   │   ├── centralbank.client.ts  # HTTP client + retry + circuit breaker
│   │   └── types.ts               # CentralBank API types
│   ├── utils/
│   │   ├── phone.ts               # E.164 normalization
│   │   ├── logger.ts              # request_id + structured log
│   │   └── crypto.ts              # hash OTP, sign audit
│   ├── config/
│   │   └── env.ts                 # validated env vars
│   └── server.ts                  # Express bootstrap
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── Dockerfile
├── .env.example
├── package.json
└── README.md
```

### 5.2 Central-Bank — Notification Module + Internal Endpoints (MODIFIED)

```
Central-Bank/src/modules/notifications/
├── notification.controller.ts     # public + internal endpoints
├── notification.service.ts        # business logic
├── notification.repository.ts     # Prisma queries
└── dto/
    ├── create-notification.dto.ts
    └── list-notifications.dto.ts

Central-Bank/src/modules/settlement/
├── settlement.controller.ts       # + internal settlement endpoint
├── settlement.service.ts          # + settleViaConnector() method
└── dto/
    └── internal-settle.dto.ts     # NEW — service JWT + delegated user

Central-Bank/src/modules/users/
├── users.controller.ts            # + phone lookup endpoint
└── users.service.ts               # + findByPhone() method
```

### 5.3 SmartBank Wallet — Inbox Page (MODIFIED)

```
frontend/src/app/inbox/
└── page.tsx                        # NEW — list + detail notifikasi

frontend/src/components/
├── NotificationBell.tsx           # NEW — navbar badge
├── NotificationList.tsx           # NEW — list view
└── NotificationItem.tsx           # NEW — single notification card

frontend/src/lib/api/
└── notifications.ts               # NEW — fetch dari CentralBank
```

---

## 6. Data Models

### 6.1 Connector — New Tables

```prisma
// Connector/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// === Service Registry (sister apps registered with us) ===
model Service {
  id                String   @id @default(uuid())
  service_name      String   @unique          // "MARKETPLACE", "POS", etc
  display_name      String
  callback_url      String?                   // untuk webhook (Phase 3)
  status            ServiceStatus @default(ACTIVE)
  rate_limit_rps    Int      @default(50)
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  api_keys          ServiceApiKey[]

  @@index([service_name])
}

enum ServiceStatus {
  ACTIVE
  SUSPENDED
  REVOKED
}

// === Multiple API Keys per Service (rotasi seamless) ===
model ServiceApiKey {
  id                String       @id @default(uuid())
  service_id        String                    // FK to Service
  key_prefix        String       @unique       // first 8 chars of key (identifikasi)
  key_hash          String                     // bcrypt hash
  label             String?                    // e.g. "production", "staging", "key-1"
  last_used_at      DateTime?
  expires_at        DateTime?
  status            KeyStatus    @default(ACTIVE)
  created_at        DateTime     @default(now())
  revoked_at        DateTime?

  service           Service      @relation(fields: [service_id], references: [id])

  @@index([service_id])
  @@index([key_prefix])
  @@index([status])
}

enum KeyStatus {
  ACTIVE
  EXPIRED
  REVOKED
}

// === External User → SmartBank Wallet Mapping ===
model LinkageMap {
  id                  String   @id @default(uuid())
  service_id          String                    // FK to Service
  external_user_id    String                    // sister app's user ID
  smartbank_user_id   String                    // CentralBank user ID
  smartbank_wallet_id String                    // CentralBank wallet ID
  phone               String                    // normalized E.164
  phone_verified      Boolean  @default(false)
  linked_at           DateTime @default(now())
  unlinked_at         DateTime?
  
  @@unique([service_id, external_user_id])      // 1:1 mapping per service
  @@unique([service_id, phone])                  // 1 phone = 1 user per service (anti-phishing)
  @@index([smartbank_wallet_id])
  @@index([phone])
}

// === OTP Requests ===
model OtpRequest {
  id              String      @id @default(uuid())
  request_id      String      @unique            // public-facing ID
  service_id      String                          // FK to Service
  linkage_id      String?                         // FK to LinkageMap (nullable until linked)
  phone           String                          // E.164
  purpose         OtpPurpose
  code_hash       String                          // bcrypt
  status          OtpStatus    @default(PENDING)
  attempts        Int          @default(0)
  max_attempts    Int          @default(3)
  expires_at      DateTime
  consumed_at     DateTime?
  created_at      DateTime    @default(now())
  
  @@index([phone, status])
  @@index([phone, created_at])             // rate limit query: count OTP per phone per hour
  @@index([expires_at])
  @@index([service_id])
}

enum OtpPurpose {
  WALLET_LINK
}

// NOTE: Pembayaran menggunakan PIN transaksi, bukan OTP.
//       OtpPurpose.PAYMENT_CONFIRM dihapus — tidak sesuai domain rules.

enum OtpStatus {
  PENDING
  CONSUMED
  EXPIRED
  BLOCKED
}

// === Idempotency Cache ===
model IdempotencyRecord {
  key             String   @id                    // Idempotency-Key header value
  service_id      String
  endpoint        String
  request_hash    String                          // hash of request body
  response_status Int
  response_body   Json
  created_at      DateTime @default(now())
  expires_at      DateTime                          // TTL 24h
  
  @@index([expires_at])
}

// === Immutable Audit Log ===
model AuditLog {
  id              String   @id @default(uuid())
  timestamp       DateTime @default(now())
  service_id      String?
  service_name    String?                         // denormalized for query speed
  actor_type      String                          // "SISTER_APP" | "ADMIN" | "SYSTEM"
  actor_id        String?                         // external_user_id or admin ID
  action          String                          // "OTP_REQUESTED", "USER_LINKED", etc
  target_type     String?                         // "USER", "WALLET", "TRANSACTION"
  target_id       String?
  request_id      String?
  ip_address      String?
  metadata        Json?
  signature       String                          // HMAC chain (anti-tamper)
  previous_id     String?                         // chain to previous audit
  
  @@index([timestamp])
  @@index([service_id, timestamp])
  @@index([target_type, target_id])
  @@index([action, timestamp])
}
```

### 6.2 CentralBank — New Notification Table

```prisma
// Central-Bank/prisma/schema.prisma — TAMBAHAN
model Notification {
  id              String           @id @default(uuid())
  user_id         String                                // SmartBank user
  type            NotificationType
  channel         NotificationChannel @default(IN_APP)
  source_app      String?                               // "MARKETPLACE", etc
  source_ref      String?                               // external payment_request_id etc
  title           String
  body            String
  payload         Json?                                 // {otp_code, request_id, expires_at, ...}
  read_at         DateTime?
  created_at      DateTime         @default(now())
  
  @@index([user_id, read_at])
  @@index([user_id, created_at])
  @@index([type, created_at])
}

enum NotificationType {
  OTP_LINKING_REQUESTED   // OTP untuk WALLET_LINK (user lihat di inbox)
  OTP_VERIFIED            // OTP berhasil diverifikasi
  OTP_EXPIRED             // OTP expired
  OTP_BLOCKED             // Max attempts exceeded
  PAYMENT_SETTLED         // Transaction settled
  PAYMENT_FAILED          // Transaction failed
  WALLET_LINKED           // Sister app berhasil linked ke wallet
  WALLET_UNLINKED         // Sister app unlinked
}

enum NotificationChannel {
  IN_APP
  SMS
  EMAIL
  PUSH
}
```

---

## 7. API Contracts

### 7.1 Connector Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `POST` | `/v1/connect/users/otp/request` | API key | Generate OTP → dispatch ke inbox SmartBank user |
| `POST` | `/v1/connect/users/otp/verify` | API key | Verify OTP code (user masukkan dari inbox) |
| `POST` | `/v1/connect/users/link` | API key + verified OTP | Link external_user_id → existing SmartBank wallet |
| `GET` | `/v1/connect/users/{external_user_id}` | API key | Get linkage info |
| `DELETE` | `/v1/connect/users/{external_user_id}` | API key + admin | Unlink (soft delete) |
| `POST` | `/v1/connect/payment-requests` | API key + linked user | Forward payment ke CentralBank internal settlement (dengan PIN) |
| `GET` | `/v1/connect/payment-requests/{id}` | API key | Get payment status |
| `GET` | `/v1/connect/users/{external_user_id}/transactions` | API key | Transaction history |
| `POST` | `/v1/connect/fees/quote` | API key | Pre-calculate fee |
| `GET` | `/health` | None | Liveness |
| `GET` | `/ready` | None | Readiness (DB + CentralBank) |
| `GET` | `/v1/connect/admin/audit` | Admin key | Query audit trail |
| `POST` | `/v1/connect/admin/services` | Admin key | Register new sister app |

**CATATAN: Tidak ada endpoint `GET /v1/connect/otp/{id}`** — sister app tidak boleh retrieve OTP. OTP hanya muncul di inbox SmartBank wallet user.

**Request/Response detail** (contoh representatif, sisanya mengikuti pola yang sama):

```yaml
# POST /v1/connect/users/otp/request
# Sister app minta OTP untuk linking. OTP dikirim ke INBOX SmartBank user.
Headers:
  Authorization: Bearer <service_api_key>
  X-Service-Name: MARKETPLACE
  X-Idempotency-Key: <uuid>
  X-Request-Id: <uuid>

Request:
  {
    "phone": "+6281234567890",
    "purpose": "WALLET_LINK"
  }

Flow:
  1. Connector validasi API key + rate limit
  2. Connector resolve phone → cari user di CentralBank (GET /api/v1/internal/users/by-phone/{phone})
  3. Jika user tidak ditemukan → return 404 USER_NOT_FOUND
     (user harus daftar SmartBank Wallet dulu)
  4. Generate 6-digit OTP, hash, simpan
  5. Dispatch OTP ke inbox user via CentralBank:
     POST /api/v1/internal/notifications { type: OTP_LINKING_REQUESTED, payload: { otp_code, request_id, expires_at } }
  6. Return request_id ke sister app

Response 200:
  {
    "success": true,
    "data": {
      "request_id": "otpreq_abc123",
      "expires_at": "2026-06-23T15:30:00Z",
      "ttl_seconds": 300,
      "attempts_allowed": 3,
      "phone_masked": "+62xxx-xxx-7890",
      "hint": "Buka aplikasi SmartBank untuk melihat kode OTP di inbox"
    },
    "meta": {
      "request_id": "<X-Request-Id echo>",
      "timestamp": "2026-06-23T15:25:00Z"
    }
  }

Response 404 (user not found):
  {
    "success": false,
    "data": null,
    "error": {
      "code": "USER_NOT_FOUND",
      "message": "Nomor HP belum terdaftar di SmartBank. Silakan daftar dulu di aplikasi SmartBank Wallet."
    }
  }

Response 429 (rate limited):
  {
    "success": false,
    "data": null,
    "error": {
      "code": "RATE_LIMITED",
      "message": "Max 3 OTP requests per phone per hour",
      "retry_after_seconds": 1800
    }
  }

# POST /v1/connect/users/otp/verify
# User masukkan kode OTP yang dilihat di inbox SmartBank
Headers:
  Authorization: Bearer <service_api_key>
  X-Idempotency-Key: <uuid>

Request:
  {
    "request_id": "otpreq_abc123",
    "code": "847293"
  }

Response 200:
  {
    "success": true,
    "data": {
      "verified": true,
      "phone": "+6281234567890",
      "smartbank_user_id": "usr_abc",
      "verification_token": "vrf_xyz"   // short-lived token untuk link
    }
  }

Response 401:
  {
    "success": false,
    "data": null,
    "error": { "code": "OTP_INVALID", "message": "Kode OTP salah" }
  }

Response 403:
  {
    "success": false,
    "data": null,
    "error": { "code": "OTP_BLOCKED", "message": "OTP diblokir setelah 3x percobaan" }
  }

Response 410:
  {
    "success": false,
    "data": null,
    "error": { "code": "OTP_EXPIRED", "message": "OTP sudah expired" }
  }

# POST /v1/connect/users/link
# Link external_user_id ke SmartBank wallet yang sudah ada
Headers:
  Authorization: Bearer <service_api_key>
  X-Idempotency-Key: <uuid>

Request:
  {
    "external_user_id": "mp_user_123",
    "verification_token": "vrf_xyz",
    "kyc_data": {
      "tier": "BASIC",
      "nik_masked": "3273****xxxx"
    }
  }

Response 200 (new link):
  {
    "success": true,
    "data": {
      "smartbank_user_id": "usr_xyz",
      "smartbank_wallet_id": "wal_xyz",
      "kyc_tier": "BASIC",
      "linked_at": "2026-06-23T15:31:00Z",
      "created": true
    }
  }

Response 200 (existing — idempotent):
  {
    "success": true,
    "data": {
      "smartbank_user_id": "usr_existing",
      "smartbank_wallet_id": "wal_existing",
      "kyc_tier": "VERIFIED",
      "linked_at": "2026-06-20T10:00:00Z",
      "created": false
    }
  }

Response 409:
  {
    "success": false,
    "data": null,
    "error": {
      "code": "LINKAGE_CONFLICT",
      "message": "Phone already linked to different external_user_id"
    }
  }

# POST /v1/connect/payment-requests
# Sister app forward payment. User otorisasi dengan PIN transaksi.
Headers:
  Authorization: Bearer <service_api_key>
  X-Service-Name: MARKETPLACE
  X-Idempotency-Key: <uuid>

Request:
  {
    "buyer_external_id": "mp_user_123",
    "seller_external_id": "mp_seller_456",
    "gross_amount": 100000,
    "pin": "123456",                    // PIN transaksi user
    "description": "Order ord_789",
    "source_app": "MARKETPLACE",
    "external_ref_id": "ord_789",
    "include_fees": true
  }

Flow:
  1. Connector resolve external_id → wallet_id via LinkageMap
  2. Connector call CentralBank internal settlement:
     POST /api/v1/internal/payment-requests/settle
     Headers: Authorization: Bearer <service_jwt>, X-Delegated-User-Id: <buyer_user_id>
     Body: { payer_wallet_id, payee_wallet_id, gross_amount, pin, source_app, ... }
  3. CentralBank validates PIN, checks balance, settles atomically

Response 200:
  {
    "success": true,
    "data": {
      "payment_request_id": "payreq_xxx",
      "transaction_id": "trx_yyy",
      "status": "SETTLED",
      "gross_amount": 100000,
      "fee_breakdown": {
        "marketplace": 2000,
        "bank": 1000,
        "gateway": 500,
        "tax": 2000,
        "total": 5500
      },
      "total_debit": 105500,
      "net_to_seller": 96500,
      "settled_at": "2026-06-23T15:32:00Z"
    }
  }

Response 401 (PIN salah):
  {
    "success": false,
    "data": null,
    "error": {
      "code": "INVALID_PIN",
      "message": "PIN transaksi salah",
      "attempts_remaining": 2
    }
  }
```

### 7.2 CentralBank — New Endpoints

```yaml
# === INTERNAL (service-to-service, requires X-Service-Name JWT) ===

# Phone lookup — resolve phone → user_id
GET /api/v1/internal/users/by-phone/{phone}
  Auth: Service JWT (ServiceTokenGuard)
  Used by: Connector saat OTP request (resolve phone → user_id)
  Response: { user_id, wallet_id, name, kyc_tier, phone_masked }
  Error 404: USER_NOT_FOUND — user belum daftar SmartBank Wallet

# Internal settlement — atomic create+settle payment
POST /api/v1/internal/payment-requests/settle
  Auth: Service JWT (ServiceTokenGuard)
  Headers:
    X-Delegated-User-Id: <buyer_user_id>   # user yang bertransaksi
    X-Service-Name: MARKETPLACE
    Idempotency-Key: <uuid>
  Body: {
    payer_wallet_id, payee_wallet_id, gross_amount,
    pin,                    # PIN transaksi user (plain, akan di-hash compare)
    source_app, description, external_ref_id, metadata?
  }
  Flow:
    1. Validate service JWT
    2. Verify X-Delegated-User-Id owns payer_wallet_id
    3. Validate PIN against stored pinHash (bcrypt)
    4. Idempotency check
    5. Lock accounts, balance check, daily limit
    6. Fee quote, create Transaction + LedgerEntry (SETTLED)
    7. Create PaymentRequest (PAID)
    8. Audit log with actorUserId = delegated user
  Response: {
    payment_request_id, transaction_id, status: "SETTLED",
    gross_amount, fee_breakdown: { bank, gateway, marketplace?, tax, total },
    total_debit, net_to_seller, settled_at
  }
  Error 401: INVALID_PIN (attempts_remaining)

# Create notification (internal)
POST /api/v1/internal/notifications
  Auth: Service JWT
  Used by: Connector → CentralBank
  Body: { user_id, type, source_app, source_ref, title, body, payload }
  Purpose: Create notification in CentralBank DB (so SmartBank wallet can query)

# === PUBLIC (user JWT) ===
GET /api/v1/users/me/notifications
  Query: ?type=OTP_LINKING_REQUESTED&unread_only=true&page=1&limit=20
  Returns: list of notifications for current user

PATCH /api/v1/users/me/notifications/{id}/read
  Purpose: Mark single notification as read

POST /api/v1/users/me/notifications/read-all
  Purpose: Mark all as read

GET /api/v1/users/me/notifications/unread-count
  Returns: { count: 5 }
```

### 7.3 SmartBank Wallet — Inbox Page

```yaml
# frontend/src/app/inbox/page.tsx
# Renders notification list, polls every 10s, mark-as-read on click
```

---

## 8. Data Flows

### 8.1 OTP Linking Flow (Phone Verification → Inbox)

```
User          Sister App        Connector         CentralBank        SmartBank App
 │             │                  │                 │                   │
 │ "Hubungkan   │                  │                 │                   │
 │  SmartBank"  │                  │                 │                   │
 │ Masukkan HP  │                  │                 │                   │
 ├─────────────►│ POST /otp/request│                 │                   │
 │             │ { phone }        │                 │                   │
 │             ├─────────────────►│ Validate API key│                   │
 │             │                  │ Rate limit check│                   │
 │             │                  │                 │                   │
 │             │                  │ GET /internal/  │                   │
 │             │                  │ users/by-phone/ │                   │
 │             │                  │ {phone}         │                   │
 │             │                  ├────────────────►│ lookup user by    │
 │             │                  │◄── {user_id} ───┤ phone             │
 │             │                  │                 │                   │
 │             │                  │ Generate 6-digit│                   │
 │             │                  │ Hash + INSERT   │                   │
 │             │                  │ (OtpRequest)    │                   │
 │             │                  │                 │                   │
 │             │                  │ POST /internal/ │                   │
 │             │                  │ notifications   │                   │
 │             │                  ├────────────────►│ INSERT notif      │
 │             │                  │                 │ OTP_LINKING       │
 │             │                  │◄── { ok } ──────┤                   │
 │             │                  │                 │                   │
 │             │◄── {request_id}──┤                 │                   │
 │             │                  │                 │                   │
 │ "Kode OTP   │                  │                 │                   │
 │  dikirim ke │                  │                 │  polling inbox    │
 │  SmartBank  │                  │                 │  GET /notifications│
 │  app kamu"  │                  │                 │◄──────────────────┤
 │◄────────────┤                  │                 │                   │
 │             │                  │                 │                   │
 │ User buka SmartBank app ───────┼─────────────────┼──────────────────►│
 │ Lihat OTP di inbox:            │                 │  ┌──────────────┐ │
 │ ┌─────────────────────┐        │                 │  │ 🔒 Kode OTP  │ │
 │ │ Kode: 847293        │        │                 │  │ 847293       │ │
 │ │ Marketplace         │        │                 │  │ Berlaku 5mnt │ │
 │ │ Berlaku 4:55        │        │                 │  └──────────────┘ │
 │ └─────────────────────┘        │                 │                   │
 │             │                  │                 │                   │
 │ Balik ke Sister App            │                 │                   │
 │ Masukkan kode: 847293          │                 │                   │
 ├─────────────►│ POST /otp/verify│                 │                   │
 │             │ { code }        │                 │                   │
 │             ├─────────────────►│ Verify OTP      │                   │
 │             │◄── {verified} ───┤                 │                   │
 │             │                  │                 │                   │
 │             │ POST /users/link │                 │                   │
 │             ├─────────────────►│ Insert Linkage  │                   │
 │             │◄── {wallet_id} ──┤                 │                   │
 │             │                  │                 │                   │
 │ "Wallet berhasil              │                 │                   │
 │  terhubung!"                  │                 │                   │
 │◄────────────┤                  │                 │                   │
```

**Key security points:**
- OTP hanya muncul di SmartBank inbox — user harus punya akses ke SmartBank app
- Sister app tidak bisa retrieve OTP — tidak ada `GET /otp/{id}` endpoint
- Phone lookup memastikan user sudah terdaftar di SmartBank sebelum bisa di-link
- User consent: user harus aktif buka SmartBank app untuk lihat OTP

### 8.2 Payment Request (Sister App → CentralBank Internal Settlement)

```
User          Sister App        Connector         CentralBank          MySQL
 │             │                  │                 │                    │
 │ click Pay   │                  │                 │                    │
 ├────────────►│                  │                 │                    │
 │             │ "Masukkan PIN"   │                 │                    │
 │ Input PIN   │                  │                 │                    │
 ├────────────►│ POST /payment-   │                 │                    │
 │             │ requests         │                 │                    │
 │             │ { buyer_ext_id,  │                 │                    │
 │             │   seller_ext_id, │                 │                    │
 │             │   gross_amount,  │                 │                    │
 │             │   pin }          │                 │                    │
 │             ├─────────────────►│ Resolve linkage │                    │
 │             │                  │ ext_id→wallet_id│                    │
 │             │                  │ Check idempotency                    │
 │             │                  │                 │                    │
 │             │                  │ POST /internal/ │                    │
 │             │                  │ payment-requests│                    │
 │             │                  │ /settle         │                    │
 │             │                  │ + service JWT   │                    │
 │             │                  │ + X-Delegated-  │                    │
 │             │                  │   User-Id       │                    │
 │             │                  ├────────────────►│                    │
 │             │                  │                 │ Validate PIN       │
 │             │                  │                 │ Idempotency check  │
 │             │                  │                 │ Lock accounts      │
 │             │                  │                 │ Balance check      │
 │             │                  │                 │ Fee quote          │
 │             │                  │                 │                    │
 │             │                  │                 │ Settlement (atomic)│
 │             │                  │                 │ CREATE Transaction │
 │             │                  │                 │ INSERT LedgerEntry │
 │             │                  │                 │ UPDATE balances    │
 │             │                  │                 │ CREATE PaymentReq  │
 │             │                  │                 │ (PAID)             │
 │             │                  │                 ├───────────────────►│
 │             │                  │                 │                    │
 │             │                  │                 │ INSERT notification│
 │             │                  │                 │ (PAYMENT_SETTLED)  │
 │             │                  │                 ├───────────────────►│
 │             │                  │◄─ {SETTLED} ────┤                    │
 │             │                  │                 │                    │
 │             │                  │ Audit log       │                    │
 │             │◄── {SETTLED} ─────┤                 │                    │
 │ "Berhasil!" │                  │                 │                    │
 │◄────────────┤                  │                 │                    │
```

**Note:** PIN divalidasi oleh CentralBank (bcrypt compare terhadap `pinHash`). Connector tidak menyimpan atau memvalidasi PIN. PIN dikirim plain dari sister app → connector → CentralBank. Untuk production, gunakan TLS + PIN should be hashed client-side.

### 8.3 SmartBank Wallet — Inbox Refresh

```
SmartBank Wallet UI          CentralBank         MySQL
 │                            │                    │
 │ Page load                  │                    │
 │ GET /notifications?page=1  │                    │
 ├───────────────────────────►│ SELECT notifications│
 │                            │ WHERE user_id=?    │
 │                            ├───────────────────►│
 │                            │◄────── list ────────┤
 │◄────── { items, total } ───┤                    │
 │                            │                    │
 │ setInterval(10000)         │                    │
 │ GET /notifications?page=1  │                    │
 ├───────────────────────────►│ (same query)       │
 │                            │                    │
 │ Show new items with badge  │                    │
 │                            │                    │
 │ User clicks item           │                    │
 │ PATCH /notifications/{id}/read                   │
 ├───────────────────────────►│ UPDATE SET read_at=NOW()│
 │                            ├───────────────────►│
 │◄────── { ok: true } ───────┤                    │
 │                            │                    │
 │ User clicks "Tandai semua dibaca"                 │
 │ POST /notifications/read-all                     │
 ├───────────────────────────►│ UPDATE all unread │
 │                            ├───────────────────►│
 │◄────── { updated: 5 } ─────┤                    │
```

---

## 9. UI Components (SmartBank Wallet Inbox)

### 9.1 Notification Bell (Navbar)

```
┌──────────────────────────────────────────────────┐
│ SmartBank  CBDC    [Inbox 🔔 3]  Panduan  Masuk  │
└──────────────────────────────────────────────────┘
                          ↑ badge dengan count unread
```

**Behavior:**
- Badge muncul hanya jika unread_count > 0
- Polling setiap 10 detik via `/users/me/notifications/unread-count`
- Click bell → navigate to `/inbox`

### 9.2 Inbox Page Layout

```
┌────────────────────────────────────────────────────────────┐
│ Inbox                                          [Tandai Semua]│
│ ─────────────────────────────────────────────────────────── │
│ Filter: [Semua] [OTP] [Pembayaran] [Wallet] [Belum Dibaca]│
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ 🔒 OTP Diminta                              2 menit lalu│ │
│ │ Kode OTP SmartBank Anda: 847293                       │ │
│ │ Sumber: MARKETPLACE · Untuk: link wallet              │ │
│ │                                            [Tandai ✓] │ │
│ └────────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ 💳 Pembayaran Berhasil                    1 jam lalu  │ │
│ │ Transfer Rp 100.000 ke wal_seller456 berhasil       │ │
│ │ ID Transaksi: trx_abc123                              │ │
│ │                                            [Tandai ✓] │ │
│ └────────────────────────────────────────────────────────┘ │
│ ...                                                       │
│                                                            │
│              [ Muat Lebih Banyak ]                          │
└────────────────────────────────────────────────────────────┘
```

**Component features:**
- Filter chip per notification type
- Mark-as-read on click (PATCH endpoint)
- "Tandai semua" button (POST read-all)
- Pagination (load more button, 20 items/page)
- Real-time refresh: polling setiap 10s, prepend new items
- Empty state: icon + message "Tidak ada notifikasi"

### 9.3 Notification Detail Modal

```
┌──────────────────────────────────────────┐
│ OTP Diminta                          [X] │
│ ──────────────────────────────────────── │
│ Kode OTP Anda:                           │
│                                          │
│         ┌─────────────────────┐         │
│         │                     │         │
│         │      8 4 7 2 9 3    │         │
│         │                     │         │
│         └─────────────────────┘         │
│                                          │
│ Sumber:     MARKETPLACE                  │
│ Untuk:      Verifikasi nomor telepon     │
│ Berlaku:    04:55 (4 menit lagi)         │
│                                          │
│ ⚠ Kode ini hanya untuk SmartBank wallet │
│ Anda. Jangan berikan ke siapa pun.       │
│                                          │
│              [  Salin Kode  ]            │
└──────────────────────────────────────────┘
```

---

## 10. Error Handling & Resilience

| Failure Scenario | Behavior |
|---|---|---|
| CentralBank down (HTTP 5xx) | Circuit breaker opens, retry 3× with exponential backoff (1s, 2s, 4s), return 503 to sister app after exhausted |
| CentralBank timeout (>10s) | Return 504 to sister app, mark payment as PENDING (sister app can poll) |
| Duplicate Idempotency-Key | Return cached previous response (200), don't re-execute |
| Phone not registered in SmartBank | Return 404 USER_NOT_FOUND (user harus daftar SmartBank Wallet dulu) |
| Invalid phone format | Return 400 INVALID_PHONE_FORMAT |
| Rate limit exceeded | Return 429 with Retry-After header |
| OTP wrong code | Return 401 OTP_INVALID, increment attempts |
| OTP 3 failed attempts | Mark OTP as BLOCKED, return 403 OTP_BLOCKED |
| Invalid PIN | Return 401 INVALID_PIN, include `attempts_remaining`. 3x salah → account locked |
| Linkage conflict (phone already linked to different user) | Return 409 LINKAGE_CONFLICT |
| Sister app tries to use another service's user | Return 403 CROSS_SERVICE_ACCESS_DENIED |
| SmartBank wallet user not linked to sister app | Return 404 USER_NOT_LINKED |
| MySQL down | Return 503 SERVICE_UNAVAILABLE (health check fails) |
| Audit log write fails | **Fail-closed** — return 500, don't proceed (integrity > availability) |

**Circuit breaker config:**
- Open after 5 consecutive failures
- Half-open after 30s
- Close after 3 consecutive successes in half-open

---

## 11. Security

### 11.1 Authentication Layers

| Layer | Mechanism |
|---|---|
| Sister app → Connector | API key (bcrypt-hashed in DB via `ServiceApiKey`, plain in header), 32+ chars random, multiple keys per service |
| Connector → CentralBank (internal) | Service JWT (`jsonwebtoken`, signed with shared secret, konsisten dengan CentralBank existing) + `X-Delegated-User-Id` header untuk user context |
| User → SmartBank wallet | User JWT (existing, no change) |
| User → SmartBank wallet (login) | Email/Phone + Password (existing) |
| User → Transaksi finansial | **PIN transaksi** (6-digit, bcrypt hashed di `User.pinHash`, divalidasi CentralBank) |
| Admin → Connector admin endpoints | Separate admin API key + IP allowlist |

### 11.2 Authorization Rules

- Sister app can ONLY access users that are linked to that sister app (via `linkage_map.service_id`)
- Sister app CANNOT read another sister app's users
- Sister app CANNOT initiate issuance/burn/admin endpoints
- Admin endpoints require admin role (separate from user roles)

### 11.3 Data Privacy

- Phone numbers stored in DB but masked in API responses (`+62xxx-xxx-7890`)
- OTP codes hashed in DB (bcrypt), never plain
- Audit logs include request_id but NOT password/PIN/token plaintext
- KYC data only stored in CentralBank (master), Connector caches only what's needed for linkage

### 11.4 Anti-Tampering (Audit Log)

- Audit log entries chained via `previous_id` + `signature` (HMAC)
- Each entry signs: `{id, timestamp, action, target, metadata, previous_signature}`
- Tampering with one entry breaks the chain → detection on audit verify

### 11.5 Rate Limits

| Endpoint | Limit |
|---|---|
| `/v1/connect/users/otp/request` | 3 per phone per hour, 50 per service per minute |
| `/v1/connect/users/link` | 10 per external_user_id per hour |
| `/v1/connect/payment-requests` | 100 per service per minute |
| `/v1/connect/users/{id}/transactions` | 30 per service per minute |

---

## 12. Testing Strategy

| Layer | Test Type | Tool | Coverage Target |
|---|---|---|---|
| Unit | OTP gen/verify, linkage idempotency, fee calc, phone normalize | Jest | 80%+ |
| Integration | Connector ↔ CentralBank (real HTTP), DB ops | Jest + Supertest | All happy + error paths |
| E2E | Sister app simulation → Connector → CentralBank → ledger verified | Custom script | 5 critical flows |
| Contract | API response shape match CentralBank spec | Pact (optional) | All public endpoints |
| Load | 100 RPS sustained, p95 < 200ms | k6 (optional) | Not in MVP |
| Security | Auth bypass attempts, IDOR, SQLi, rate limit | Manual + automated | Pen-test before prod |

**Critical flows for E2E:**
1. User daftar SmartBank Wallet → buka Sister App → request OTP linking → OTP muncul di inbox → verify → link sukses
2. User existing re-link (idempotent)
3. Sister app request OTP untuk nomor HP yang belum terdaftar → 404 USER_NOT_FOUND
4. Payment request happy path dengan PIN valid → settle → notification generated
5. Payment request dengan PIN salah → 401 INVALID_PIN
6. Payment request duplicate (same Idempotency-Key)
7. OTP wrong code 3× → blocked
8. Sister app tries to access another service's user → 403

---

## 13. Deployment

### 13.1 docker-compose.yml Addition

```yaml
connector:
  build:
    context: ./Connector
    dockerfile: Dockerfile
  container_name: smartbank-connector
  init: true
  restart: unless-stopped
  environment:
    PORT: 5000
    NODE_ENV: ${CONNECTOR_NODE_ENV:-development}
    DATABASE_URL: mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@mysql:3301/connector_db
    CENTRAL_BANK_URL: http://central-bank:3000
    CENTRAL_BANK_SERVICE_TOKEN_SECRET: ${CONNECTOR_SERVICE_SECRET}
    JWT_ISSUER: smartbank
    RATE_LIMIT_DEFAULT_RPS: 50
    ADMIN_API_KEY: ${CONNECTOR_ADMIN_KEY}
    LOG_LEVEL: info
  ports:
    - "5000:5000"
  healthcheck:
    test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://127.0.0.1:5000/health"]
    interval: 5s
    timeout: 5s
    retries: 20
    start_period: 20s
  depends_on:
    mysql:
      condition: service_healthy
    central-bank:
      condition: service_healthy
  networks:
    - smartbank

# mysql service: add connector_db (via init script, bukan MYSQL_DATABASE)
mysql:
  environment:
    MYSQL_DATABASE: central_bank_core
  volumes:
    - ./Connector/init.sql:/docker-entrypoint-initdb.d/01-connector.sql  # CREATE DATABASE connector_db
```

### 13.2 Environment Variables

```env
# Connector
CONNECTOR_NODE_ENV=development
CONNECTOR_SERVICE_SECRET=<shared with CentralBank for JWT>
CONNECTOR_ADMIN_KEY=<32+ char random>

# Add to .env.example with full docs
```

### 13.3 Migration Order

1. CentralBank: add `notifications` table migration
2. CentralBank: add notification endpoints + service
3. CentralBank: add phone lookup endpoint (`GET /api/v1/internal/users/by-phone/{phone}`)
4. CentralBank: add internal settlement endpoint (`POST /api/v1/internal/payment-requests/settle`)
5. CentralBank: add PIN validation logic in settlement flow
6. Connector: setup Prisma + create all tables
7. Frontend: add inbox page + OTP detail view + notification components
8. Docker compose: add connector service
9. Seed: register first sister app service (MARKETPLACE) + generate API key
10. Seed: create test SmartBank user (dengan wallet + PIN) untuk E2E testing

---

## 14. Implementation Phases

### Phase 1: MVP (target 1-2 weeks)
- Connector service skeleton (Express + Prisma)
- OTP service (generate → dispatch to inbox via CentralBank notif)
- Phone lookup integration (resolve phone → user_id via CentralBank)
- Linkage service (link existing SmartBank user ke sister app)
- CentralBank: notification table + endpoints
- CentralBank: internal settlement endpoint (`POST /api/v1/internal/payment-requests/settle`)
- CentralBank: phone lookup endpoint (`GET /api/v1/internal/users/by-phone/{phone}`)
- CentralBank: PIN validation in settlement flow
- Frontend inbox page (read-only, polling 10s)
- Frontend OTP detail view (kode + countdown timer)
- Basic audit log
- Docker compose integration
- E2E happy path: user daftar SmartBank → link ke sister app → bayar pakai PIN

### Phase 2: Hardening (target +1 week)
- Rate limiting + circuit breaker
- Admin endpoints (register sister app, audit query, manage API keys)
- Anti-tampering HMAC chain
- Frontend polish (filter, mark-read animations)
- Load test 100 RPS
- Security audit

### Phase 3: Future (out of MVP scope)
- Webhook push (real-time notifications to sister apps — skip Phase 2, deferred to Phase 3)
- Notification auto-cleanup job (purge >90 hari)
- Real SMS gateway integration (swap from simulated)
- Multi-currency support
- Sister app admin dashboard
- Migration tools for existing sister apps

---

## 15. Resolved Decisions (ex-Open Questions)

Sepuluh open questions telah di-review dan diputuskan berdasarkan konteks codebase existing. Berikut ringkasan beserta reasoning:

| # | Pertanyaan | Keputusan | Reasoning |
|---|---|---|---|
| 1 | **Phone normalization library** | **`libphonenumber-js`** | MIT license, zero deps, handle E.164 normalization + masking (`+62xxx-xxx-7890`) yang spec butuh. Custom regex fragile untuk edge cases nomor internasional |
| 2 | **JWT library** | **`jsonwebtoken`** (konsisten) | CentralBank udah pake via `@nestjs/jwt`, Gateway & Wallet pake raw `jsonwebtoken`. Ngenalin `jose` cuma nambah complexity tanpa benefit — service token internal, bukan public JWKS |
| 3 | **Polling interval** | **10s (kompromi)** | 15s terasa lambat untuk OTP (TTL 5 menit). 5s terlalu agresif untuk MVP (server load). 10s sweet spot: user lihat notifikasi dalam ~10s dengan beban server manageable |
| 4 | **OTP format** | **6 digit numeric** | Standar perbankan Indonesia (BCA, BRI, Mandiri, Gojek, dll). User familiar, gampang diketik di mobile. 8 char alphanumeric lebih error-prone (O vs 0, I vs 1) |
| 5 | **API key rotation** | **Multiple active keys per service** | Enable seamless rotasi tanpa downtime. Sister apps mungkin punya deploy cycle sendiri yang nggak aligned dengan SmartBank. Flow: generate key baru → deploy sister app → revoke key lama. `ServiceApiKey` model sudah ditambahkan di schema |
| 6 | **Admin UI path** | **`/admin/connector`** | Frontend udah punya pola baku: `AppShell → RolePage → AdminComponent` untuk semua `/admin/*`. Ngenalin rute terpisah inkonsisten |
| 7 | **Unlink strategy** | **Soft delete** (`unlinked_at`) | Preserve audit trail + enable re-link idempotent. Model `LinkageMap` sudah punya field `unlinked_at`. Hard delete bikin history transaksi jadi orphan |
| 8 | **Notification retention** | **90 hari** | Cukup untuk MVP. Pastikan index di `created_at` untuk cleanup job nanti di Phase 3 |
| 9 | **Webhook ke sister app** | **Deferred ke Phase 3** | Webhook nambah complexity signifikan (retry queue, delivery tracking, dead letter, callback validation). MVP cukup polling via `GET /payment-requests/{id}` |
| 10 | **KYC tier upgrade** | **CentralBank admin only** | CentralBank udah punya teller service mature untuk KYC (`verifyKyc`, `approveKyc`). Connector cukup *read* KYC tier via linkage info — separation of concerns yang bener |

### Additional Resolved Decisions (2026-07-03 Revision)

| # | Pertanyaan | Keputusan | Reasoning |
|---|---|---|---|
| 11 | **OTP delivery channel** | **Inbox SmartBank wallet** (bukan API retrieval) | Security: user consent, anti-phishing. Sister app tidak boleh retrieve OTP karena bisa disalahgunakan untuk klaim nomor HP sembarang. User harus punya akses ke SmartBank app untuk lihat OTP |
| 12 | **User creation strategy** | **User harus sudah daftar SmartBank dulu** | Connector hanya link existing user, bukan buat user baru. Phone lookup di CentralBank memastikan user sudah terdaftar. Jika belum → 404, user diarahkan daftar SmartBank Wallet dulu |
| 13 | **Otorisasi pembayaran** | **PIN transaksi** (bukan OTP) | Sesuai domain rules: PIN untuk transaksi finansial. OTP hanya untuk verifikasi identitas (WALLET_LINK). `OtpPurpose.PAYMENT_CONFIRM` dihapus |
| 14 | **Payment settlement flow** | **Internal endpoint atomic** (`POST /api/v1/internal/payment-requests/settle`) | Single step via service JWT + `X-Delegated-User-Id`. Hindari 2-step PENDING→PAY yang butuh user JWT. CentralBank validasi PIN, balance, dan settle dalam satu transaksi atomik |
| 15 | **PIN validation** | **CentralBank validate via bcrypt** | PIN dikirim plain dari sister app → connector → CentralBank. CentralBank bcrypt-compare terhadap `User.pinHash`. Connector tidak menyimpan atau memvalidasi PIN. Untuk production: TLS required |

---

## 16. Acceptance Criteria

Spec dianggap siap untuk plan implementation jika:

1. ✅ Semua endpoint punya request/response contract lengkap
2. ✅ Semua data model punya schema Prisma lengkap
3. ✅ Semua data flow punya sequence diagram
4. ✅ Error handling cover semua failure scenario
5. ✅ Security model jelas (auth + authz + privacy + anti-tampering)
6. ✅ Testing strategy cover critical paths
7. ✅ Deployment plan (compose + env + migration) jelas
8. ✅ Phased rollout plan dengan MVP scope yang realistis
9. ✅ Open questions resolved dan siap untuk writing-plans

---

## 17. References

- [Central-Bank/README.md](../../Central-Bank/README.md) — Prisma migration guide
- [DOCKER_SETUP.md](../../DOCKER_SETUP.md) — Deployment guide
- [context/02_deskripsi_wallet_context_cbdc.txt](../../context/02_deskripsi_wallet_context_cbdc.txt) — Wallet domain rules
- [context/03_fungsional_context_cbdc.txt](../../context/03_fungsional_context_cbdc.txt) — Functional context
- [context/06_pengembangan_arsitektur_context_cbdc.txt](../../context/06_pengembangan_arsitektur_context_cbdc.txt) — Architecture context

---

**Status:** ✅ REVISED — 2026-07-03. OTP flow diperbaiki (inbox delivery, bukan API retrieval). Payment flow pakai PIN + internal settlement endpoint atomic. User harus sudah daftar SmartBank Wallet sebelum bisa di-link. Spec siap untuk writing-plans skill.