# SmartBank Connector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement SmartBank Connector as first-party payment gateway bridge: link existing SmartBank users via OTP-in-inbox, settle sister-app payments via CentralBank internal PIN-validated endpoint, expose wallet inbox UI.

**Architecture:** Build one new `Connector/` Express + Prisma service on port 5000. Extend `Central-Bank/` with internal phone lookup, notifications, internal atomic settlement, fee breakdown, PIN validation. Extend Next.js `frontend/` with inbox page + notification client.

**Tech Stack:** Node.js 20, Express, TypeScript, Prisma, MySQL, NestJS, Next.js, `jsonwebtoken`, `bcryptjs`/`bcrypt`, `libphonenumber-js`, Jest/Supertest where already present.

## Global Constraints

- CentralBank remains single source of truth for balances, ledger, final settlement.
- Connector never creates SmartBank users; user must already exist via SmartBank Wallet.
- OTP is only for WALLET_LINK and appears in SmartBank inbox; sister apps cannot retrieve OTP.
- Payments use transaction PIN, not OTP; CentralBank validates PIN.
- All mutating endpoints require idempotency keys.
- Keep implementation minimal; no webhooks, no real SMS, no production secret manager.
- Update README/docs as part of final sprint.

---

## File Structure

### Central-Bank changes
- Modify `Central-Bank/prisma/schema.prisma`: add `Notification` model + notification enums.
- Create `Central-Bank/src/modules/notifications/*`: notification CRUD + user inbox endpoints.
- Modify `Central-Bank/src/modules/wallets/wallets.controller.ts`: add service-token phone lookup endpoint.
- Modify `Central-Bank/src/modules/fees/fee-quote.service.ts`: add `breakdown` helper.
- Create `Central-Bank/src/modules/settlement/internal-settlement.controller.ts`: service-token internal settlement route.
- Modify `Central-Bank/src/modules/settlement/settlement.service.ts`: add `settleViaConnector()` with PIN validation.
- Modify `Central-Bank/src/modules/settlement/settlement.module.ts`: register controller deps.
- Modify `Central-Bank/src/app.module.ts`: import `NotificationsModule`.

### Connector service
- Create `Connector/package.json`, `tsconfig.json`, `.env.example`, `README.md`.
- Create `Connector/prisma/schema.prisma` + `Connector/prisma/init.sql`.
- Create `Connector/src/server.ts`, `config/env.ts`, `utils/*`, `middleware/*`, `integrations/centralbank.client.ts`.
- Create `Connector/src/services/{otp,linkage,payment,audit}.service.ts`.
- Create `Connector/src/api/{otp,users,payments,health,admin}.routes.ts`.
- Create `Connector/tests/smoke.test.ts`.

### Frontend changes
- Create `frontend/src/lib/notifications.ts`.
- Create `frontend/src/app/inbox/page.tsx`.
- Create `frontend/src/components/NotificationBell.tsx`, `NotificationList.tsx`, `NotificationItem.tsx`.
- Modify existing nav/header only if a clear nav component exists; otherwise inbox is reachable by URL.

### Deployment/docs
- Modify root `docker-compose.yml`: add connector service and connector DB init.
- Modify root README/docs: add Connector setup, env vars, test commands.

---

## Sprint 1 — CentralBank Notification + Phone Lookup

**Deliverable:** CentralBank can store notifications, list current user's inbox, count unread, mark read, and resolve user by phone for internal services.

- [ ] Add notification enums/model to Prisma schema.
- [ ] Implement `NotificationsModule` with service/controller.
- [ ] Add internal `POST /api/v1/internal/notifications` guarded by `ServiceTokenGuard`.
- [ ] Add user JWT endpoints: list, unread count, mark read, read all.
- [ ] Add internal phone lookup endpoint under existing wallets/users controller.
- [ ] Add tests or smoke script for model/service behavior.
- [ ] Run `npm run build` in `Central-Bank/`.

## Sprint 2 — CentralBank Internal Settlement + PIN

**Deliverable:** Connector can call CentralBank internal settlement endpoint; CentralBank validates delegated user owns payer wallet, validates PIN, settles atomically, returns fee breakdown.

- [ ] Add DTO for internal settlement.
- [ ] Add `POST /api/v1/internal/payment-requests/settle` guarded by `ServiceTokenGuard`.
- [ ] Add `settleViaConnector()` to `SettlementService` by adapting existing `settlePaymentRequest()` path.
- [ ] Add `FeeQuoteService.toBreakdown()` to return per-fee totals.
- [ ] Add PIN validation using bcrypt compare against `User.pinHash`.
- [ ] Create `PaymentRequest` as `PAID`, create `Transaction`, ledger entries, audit, notification.
- [ ] Run CentralBank build/tests.

## Sprint 3 — Connector Service Skeleton + Core Middleware

**Deliverable:** `Connector/` starts on port 5000, validates env, has Prisma schema, API-key auth, idempotency cache, health/ready.

- [ ] Create Connector npm project files.
- [ ] Create Prisma schema: Service, ServiceApiKey, LinkageMap, OtpRequest, IdempotencyRecord, AuditLog.
- [ ] Implement env validation.
- [ ] Implement API key middleware with bcrypt hash compare and service context.
- [ ] Implement idempotency middleware/service.
- [ ] Implement health/ready routes.
- [ ] Add smoke test.
- [ ] Run Connector build/test.

## Sprint 4 — Connector OTP + Linkage

**Deliverable:** Sister apps can request OTP for an existing SmartBank phone, user sees OTP in SmartBank inbox, sister app verifies OTP, then links external user to wallet.

- [ ] Implement CentralBank client: phone lookup, create notification.
- [ ] Implement OTP request: normalize phone, rate limit, phone lookup, generate/hash OTP, create inbox notification, return request id.
- [ ] Implement OTP verify: compare code, block after 3 attempts, return short-lived verification token.
- [ ] Implement user link: consume verification token, upsert LinkageMap, audit.
- [ ] Implement get/unlink linkage.
- [ ] Add tests for OTP and linkage happy/error paths.

## Sprint 5 — Connector Payment

**Deliverable:** Sister app payment calls Connector with buyer/seller external IDs + PIN; Connector resolves linkages, calls CentralBank internal settlement, returns SETTLED response.

- [ ] Implement payment route validation.
- [ ] Resolve buyer/seller external IDs within same service.
- [ ] Call CentralBank internal settlement with service token and delegated user id.
- [ ] Cache idempotent response.
- [ ] Add payment status lookup from Connector idempotency/audit state.
- [ ] Add tests for valid PIN pass-through, linkage missing, CentralBank error mapping.

## Sprint 6 — SmartBank Frontend Inbox UI

**Deliverable:** Logged-in user can open `/inbox`, see OTP and transaction notifications, unread count, mark read/read all.

- [ ] Add notification API client.
- [ ] Add `/inbox` page with polling every 10s.
- [ ] Add notification list/item components.
- [ ] Add OTP detail styling with countdown from payload `expires_at`.
- [ ] Add unread-count bell if nav component is straightforward; otherwise add inbox link in dashboard/profile area.
- [ ] Run frontend lint/build.

## Sprint 7 — Compose, Seeds, Docs

**Deliverable:** Project docs explain Connector setup/run/test; compose includes Connector and DB init; README reflects new flow.

- [ ] Add Connector `.env.example` and README.
- [ ] Update root docker compose with connector service and `connector_db` init script.
- [ ] Update root docs/README with new OTP/PIN flow.
- [ ] Add seed instructions for Service + API key.
- [ ] Run build/test matrix and record results.

---

## Self-Review

Spec coverage: all MVP requirements map to Sprint 1-7. Deferred items (webhooks, SMS, cleanup job, production secrets, sister app admin dashboard) remain out of scope.

Placeholder scan: no TBD/TODO placeholders in task goals. Detailed code will be produced during sprint execution to match actual codebase patterns.

Type consistency: external contracts use `phone`, `external_user_id`, `verification_token`, `pin`, `X-Delegated-User-Id`, `Idempotency-Key`, `SERVICE_TOKEN` consistently.
