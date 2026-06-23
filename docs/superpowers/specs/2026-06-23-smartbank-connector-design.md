# SmartBank Connector Service — Design Spec

**Tanggal:** 2026-06-23
**Status:** Draft — menunggu review user
**Owner:** SmartBank Architecture
**Scope:** Connector service + CentralBank inbox extension + SmartBank wallet inbox UI

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
| 2 | Identity model | **C. Hybrid** | User punya SmartBank wallet tapi tidak expose SmartBank UI langsung. Sister app query via connector |
| 3 | Autentikasi phone | **Opsi 2. Simulated OTP (2-step retrieve)** | Realistis (mimic SMS pattern), tidak expose OTP di response pertama |
| 4 | Inbox display | **C. Full inbox + UI** | User bisa lihat OTP + notifikasi transaksi di SmartBank wallet inbox (real product feel) |

**Topology deployment:** Opsi 3 — SmartBank sebagai Payment-as-a-Service, sister apps adalah first-party consumers (mostly external). Auth via per-service API key.

---

## 3. Goals & Non-Goals

### Goals
1. ✅ Sister apps bisa mendaftarkan user via phone → dapat SmartBank wallet
2. ✅ Sister apps bisa forward payment request → settle di CentralBank
3. ✅ User bisa verifikasi phone via OTP (simulasi)
4. ✅ User bisa lihat OTP + notifikasi di SmartBank wallet inbox
5. ✅ Audit trail immutable untuk compliance
6. ✅ Idempotent di semua endpoint (aman retry)
7. ✅ Rate limiting anti-abuse
8. ✅ Health check + readiness untuk orchestration

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
│   │  │ API Layer   ││ Orchestrator ││ OTP Service  │    │                │
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
│   │  └──────────────────┬───────────────────────┘       │                │
│   │                     │                                │                │
│   │  ┌──────────────────┴───────────────────────┐       │                │
│   │  │  MySQL: central_bank_core                │       │                │
│   │  │  + NEW TABLE: notifications              │       │                │
│   │  └──────────────────────────────────────────┘       │                │
│   └─────────────────────┬───────────────────────────────┘                │
│                         │ user JWT                                        │
│                         ▼                                                │
│   ┌─────────────────────────────────────────────────────┐                │
│   │  WALLET (existing)                                   │                │
│   │  + NEW: /inbox page (proxy to CentralBank notif)    │                │
│   │  + NEW: notification badge in navbar                 │                │
│   └─────────────────────┬───────────────────────────────┘                │
│                         │                                                │
│   ┌─────────────────────┼───────────────────────────────┐                │
│   │  FRONTEND :3001     │  [MODIFIED — add /inbox page]  │                │
│   │  (Next.js)                                               │
│   └─────────────────────────────────────────────────────┘                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Tech stack:**
- Connector: Node.js 20 + Express + Prisma + MySQL
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
│   │   ├── otp.routes.ts          # /v1/connect/users/otp/* + /v1/connect/otp/*
│   │   ├── payments.routes.ts     # /v1/connect/payment-requests/*
│   │   ├── admin.routes.ts        # /v1/connect/admin/*
│   │   └── health.routes.ts       # /health, /ready
│   ├── middleware/
│   │   ├── auth.ts                # API key validation
│   │   ├── rateLimit.ts           # per-service rate limit
│   │   ├── idempotency.ts         # Idempotency-Key check
│   │   └── errorHandler.ts        # unified error response
│   ├── services/
│   │   ├── linkage.service.ts     # external_id ↔ wallet_id mapping
│   │   ├── otp.service.ts         # generate/retrieve/verify OTP
│   │   ├── payment-orchestrator.service.ts  # forward to CentralBank
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

### 5.2 Central-Bank — Notification Module (MODIFIED)

```
Central-Bank/src/modules/notifications/
├── notification.controller.ts     # public + internal endpoints
├── notification.service.ts        # business logic
├── notification.repository.ts     # Prisma queries
└── dto/
    ├── create-notification.dto.ts
    └── list-notifications.dto.ts
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
  api_key_hash      String                    // bcrypt hash of API key
  display_name      String
  callback_url      String?                   // for future webhook
  status            ServiceStatus @default(ACTIVE)
  rate_limit_rps    Int      @default(50)
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
  
  @@index([service_name])
}

enum ServiceStatus {
  ACTIVE
  SUSPENDED
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
  @@index([expires_at])
  @@index([service_id])
}

enum OtpPurpose {
  WALLET_LINK
  PAYMENT_CONFIRM
}

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
  OTP_REQUESTED          // SmartBank user requested OTP (via connector)
  OTP_VERIFIED           // OTP successfully verified
  OTP_EXPIRED            // OTP expired
  OTP_BLOCKED            // Max attempts exceeded
  PAYMENT_SETTLED        // Transaction settled
  PAYMENT_FAILED         // Transaction failed
  WALLET_LINKED          // First-time wallet linkage
  WALLET_UNLINKED        // Sister app unlinked
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
| `POST` | `/v1/connect/users/otp/request` | API key | Generate OTP untuk phone |
| `GET` | `/v1/connect/otp/{request_id}` | API key | Retrieve OTP (simulasi) |
| `POST` | `/v1/connect/users/otp/verify` | API key | Verify OTP code |
| `POST` | `/v1/connect/users/link` | API key + verified OTP | Link external user → wallet |
| `GET` | `/v1/connect/users/{external_user_id}` | API key | Get linkage info |
| `DELETE` | `/v1/connect/users/{external_user_id}` | API key + admin | Unlink (GDPR-like) |
| `POST` | `/v1/connect/payment-requests` | API key + linked user | Forward payment ke CentralBank |
| `GET` | `/v1/connect/payment-requests/{id}` | API key | Get status |
| `GET` | `/v1/connect/users/{external_user_id}/transactions` | API key | Transaction history |
| `POST` | `/v1/connect/fees/quote` | API key | Pre-calculate fee |
| `GET` | `/health` | None | Liveness |
| `GET` | `/ready` | None | Readiness (DB + CentralBank) |
| `GET` | `/v1/connect/admin/audit` | Admin key | Query audit trail |
| `POST` | `/v1/connect/admin/services` | Admin key | Register new sister app |

**Request/Response detail** (contoh representatif, sisanya mengikuti pola yang sama):

```yaml
# POST /v1/connect/users/otp/request
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

Response 200:
  {
    "success": true,
    "data": {
      "request_id": "otpreq_abc123",
      "expires_at": "2026-06-23T15:30:00Z",
      "ttl_seconds": 300,
      "attempts_allowed": 3,
      "dev_hint": "GET /v1/connect/otp/otpreq_abc123 to retrieve (simulated)"
    },
    "meta": {
      "request_id": "<X-Request-Id echo>",
      "timestamp": "2026-06-23T15:25:00Z"
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

# GET /v1/connect/otp/otpreq_abc123
Headers:
  Authorization: Bearer <service_api_key>

Response 200:
  {
    "success": true,
    "data": {
      "code": "847293",
      "phone_masked": "+62xxx-xxx-7890",
      "expires_in_seconds": 287,
      "simulated": true
    }
  }

Response 410:
  {
    "success": false,
    "data": null,
    "error": { "code": "OTP_EXPIRED", "message": "OTP already consumed or expired" }
  }

# POST /v1/connect/users/link
Headers:
  Authorization: Bearer <service_api_key>
  X-Idempotency-Key: <uuid>

Request:
  {
    "external_user_id": "mp_user_123",
    "phone": "+6281234567890",
    "otp_request_id": "otpreq_abc123",
    "name": "Budi Santoso",
    "kyc_data": {
      "tier": "BASIC",
      "nik_masked": "3273****xxxx"
    }
  }

Response 200 (new):
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
Headers:
  Authorization: Bearer <service_api_key>
  X-Service-Name: MARKETPLACE
  X-Idempotency-Key: <uuid>

Request:
  {
    "buyer_external_id": "mp_user_123",
    "seller_external_id": "mp_seller_456",
    "gross_amount": 100000,
    "description": "Order ord_789",
    "source_app": "MARKETPLACE",
    "external_ref_id": "ord_789",
    "include_fees": true
  }

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
```

### 7.2 CentralBank — New Endpoints

```yaml
# === INTERNAL (service-to-service, requires X-Service-Name JWT) ===
POST /api/v1/internal/notifications
  Used by: Connector → CentralBank
  Body: { user_id, type, source_app, source_ref, title, body, payload }
  Purpose: Create notification in CentralBank DB (so SmartBank wallet can query)

# === PUBLIC (user JWT) ===
GET /api/v1/users/me/notifications
  Query: ?type=OTP_REQUESTED&unread_only=true&page=1&limit=20
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
# Renders notification list, polls every 15s, mark-as-read on click
```

---

## 8. Data Flows

### 8.1 OTP Generation (Phone Verification)

```
User                Sister App          Connector           CentralBank        MySQL
 │  input phone      │                   │                   │                  │
 ├──────────────────►│ POST /otp/request │                   │                  │
 │                   ├──────────────────►│ Validate API key  │                  │
 │                   │                   │ Rate limit check  │                  │
 │                   │                   │ Generate 6-digit  │                  │
 │                   │                   │ Hash + INSERT     │                  │
 │                   │                   ├───────────────────┼─────────────────►│
 │                   │                   │                   │                  │
 │                   │                   │ Call internal notif API              │
 │                   │                   ├──────────────────►│                  │
 │                   │                   │                  INSERT notification  │
 │                   │                   │                  ├──────────────────►│
 │                   │                   │◄─────────────────┤                  │
 │                   │◄── {request_id} ──┤                   │                  │
 │                   │                   │                   │                  │
 │  Show "OTP sent"  │                   │                   │                  │
 │  banner (in sis-  │                   │                   │                  │
 │  ter app)         │ GET /otp/{id}    │                   │                  │
 │                   │ (auto after UX    │ SELECT otp_request│                  │
 │                   │  delay)           ├───────────────────┼─────────────────►│
 │                   ├──────────────────►│◄──── {code} ──────┤                  │
 │                   │◄── {code} ────────┤                   │                  │
 │                   │                   │                   │                  │
 │  Show OTP banner  │                   │                   │                  │
 │ "Kode: 847293"    │                   │                   │                  │
 │◄──────────────────┤                   │                   │                  │
 │                   │                   │                   │                  │
 │  Meanwhile, if user has SmartBank wallet app open:        │                  │
 │  SmartBank polls /users/me/notifications every 15s        │                  │
 │  → sees "OTP_REQUESTED" entry with code 847293            │                  │
```

### 8.2 Payment Request (Sister App → CentralBank Settlement)

```
User          Sister App        Connector         CentralBank          MySQL
 │             │                  │                 │                    │
 │ click Pay   │                  │                 │                    │
 ├────────────►│ POST /payment-   │                 │                    │
 │             │ requests         │                 │                    │
 │             ├─────────────────►│ Validate linkage│                    │
 │             │                  │ Check idempotency                    │
 │             │                  │ Quote fees (if)  │                    │
 │             │                  │                 │                    │
 │             │                  │ POST /payment-requests                 │
 │             │                  │ + X-Service-Name│                    │
 │             │                  │ + Idempotency-Key                    │
 │             │                  ├────────────────►│                    │
 │             │                  │                 │ Settlement (atomic)│
 │             │                  │                 │ ├─────────────────►│
 │             │                  │                 │ INSERT ledger      │
 │             │                  │                 │ UPDATE balances    │
 │             │                  │                 │◄─────────────────┤
 │             │                  │                 │                    │
 │             │                  │                 │ INSERT notification│
 │             │                  │                 │ (PAYMENT_SETTLED)  │
 │             │                  │                 ├─────────────────►│
 │             │                  │◄─ {SETTLED, trx}┤                    │
 │             │◄── {SETTLED} ─────┤                 │                    │
 │ "Berhasil!" │                  │ Audit log       │                    │
 │◄────────────┤                  ├─────────────────┼──────────────────►│
```

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
 │ setInterval(15000)         │                    │
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
- Polling setiap 15 detik via `/users/me/notifications/unread-count`
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
- Real-time refresh: polling setiap 15s, prepend new items
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
|---|---|
| CentralBank down (HTTP 5xx) | Circuit breaker opens, retry 3× with exponential backoff (1s, 2s, 4s), return 503 to sister app after exhausted |
| CentralBank timeout (>10s) | Return 504 to sister app, mark payment as PENDING (sister app can poll) |
| Duplicate Idempotency-Key | Return cached previous response (200), don't re-execute |
| Invalid phone format | Return 400 INVALID_PHONE_FORMAT |
| Rate limit exceeded | Return 429 with Retry-After header |
| OTP wrong code | Return 401 OTP_INVALID, increment attempts |
| OTP 3 failed attempts | Mark OTP as BLOCKED, return 403 OTP_BLOCKED |
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
| Sister app → Connector | API key (bcrypt-hashed in DB, plain in header), 32+ chars random |
| Connector → CentralBank | Service JWT (issued by CentralBank on `/auth/service-token`, signed with shared secret) |
| User → SmartBank wallet | User JWT (existing, no change) |
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
1. New sister app user → OTP → link → wallet created
2. Existing user re-link (idempotent)
3. Payment request happy path → settle → notification generated
4. Payment request duplicate (same Idempotency-Key)
5. OTP wrong code 3× → blocked
6. Sister app tries to access another service's user → 403

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

# mysql service: add CONNECTOR_DB
mysql:
  environment:
    MYSQL_DATABASE: central_bank_core,connector_db  # multi-db
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
3. Connector: setup Prisma + create all tables
4. Frontend: add inbox page + components
5. Docker compose: add connector service
6. Seed: register first sister app service (MARKETPLACE) + generate API key

---

## 14. Implementation Phases

### Phase 1: MVP (target 1-2 weeks)
- Connector service skeleton (Express + Prisma)
- OTP service (generate/retrieve/verify)
- Linkage service
- CentralBank notification table + endpoints
- Frontend inbox page (read-only, polling 15s)
- Basic audit log
- Docker compose integration
- E2E happy path: register → link → pay

### Phase 2: Hardening (target +1 week)
- Rate limiting + circuit breaker
- Admin endpoints (register sister app, audit query)
- Anti-tampering HMAC chain
- Frontend polish (filter, mark-read animations)
- Load test 100 RPS
- Security audit

### Phase 3: Future (out of MVP scope)
- Webhook push (real-time notifications to sister apps)
- Real SMS gateway integration (swap from simulated)
- Multi-currency support
- Sister app admin dashboard
- Migration tools for existing sister apps

---

## 15. Open Questions (perlu konfirmasi sebelum implementasi)

1. **Phone normalization library**: pakai `libphonenumber-js` (comprehensive, MIT) atau custom regex?
2. **JWT library untuk service token**: pakai `jsonwebtoken` (sama dengan CentralBank) atau `jose`?
3. **Notification polling interval**: 15s (MVP), 5s (Phase 2)? Trade-off: latency vs server load
4. **OTP code format**: 6 digit numeric atau alphanumeric (8 char)?
5. **API key rotation**: support multiple active keys per service atau single + rotation period?
6. **Admin UI**: pakai existing frontend route `/admin/connector` atau page terpisah?
7. **Soft delete vs hard delete** untuk unlink: soft (set `unlinked_at`) atau hard?
8. **Notification retention**: berapa lama di-keep di DB (suggested 90 hari)?
9. **Webhook ke sister app saat SETTLED**: Phase 2 atau skip dulu?
10. **KYC tier upgrade flow**: lewat CentralBank admin atau ada endpoint khusus connector?

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
9. ✅ Open questions teridentifikasi dan siap ditanyakan

---

## 17. References

- [Central-Bank/README.md](../../Central-Bank/README.md) — Prisma migration guide
- [DOCKER_SETUP.md](../../DOCKER_SETUP.md) — Deployment guide
- [context/02_deskripsi_wallet_context_cbdc.txt](../../context/02_deskripsi_wallet_context_cbdc.txt) — Wallet domain rules
- [context/03_fungsional_context_cbdc.txt](../../context/03_fungsional_context_cbdc.txt) — Functional context
- [context/06_pengembangan_arsitektur_context_cbdc.txt](../../context/06_pengembangan_arsitektur_context_cbdc.txt) — Architecture context

---

**Status:** 🟡 DRAFT — menunggu review dan approval user sebelum lanjut ke writing-plans skill untuk implementation plan detail.