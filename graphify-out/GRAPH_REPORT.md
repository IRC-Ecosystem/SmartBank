# Graph Report - SmartBank  (2026-07-16)

## Corpus Check
- 315 files · ~133,240 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2021 nodes · 3776 edges · 175 communities (119 shown, 56 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.63)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b04b548`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.js
- AppShell.tsx
- PaymentRequestPage.tsx
- AlgorithmsController
- server.ts
- App.tsx
- app.module.ts
- page.tsx
- types.ts
- settlement.service.ts
- CreateNotificationDto
- dependencies
- central-bank.ts
- MoneyService
- dependencies
- compilerOptions
- PrismaService
- SettlementService
- page.tsx
- fetchApi
- app.js
- page.tsx
- MonetaryPolicyService
- compilerOptions
- main.ts
- requireIdempotencyKey
- Public
- auth.controller.ts
- compilerOptions
- package.json
- dependencies
- prisma.module.ts
- dependencies
- RetailDashboard.tsx
- InboxPage.tsx
- PageHeader.tsx
- RequestUser
- .parse
- scripts
- dependencies
- devDependencies
- devDependencies
- AuthProvider.tsx
- ManagerController
- .settleViaConnector
- server.js
- theme-provider.tsx
- package.json
- WalletAccountService
- exclude
- LoginPage.tsx
- scripts
- CurrentUser
- compilerOptions
- teller.controller.ts
- WalletsController
- central-bank.controller.ts
- AdminDashboard.tsx
- ErrorBoundary.tsx
- CentralBankController
- FeeQuoteDto
- CreatePaymentRequestDto
- api.ts
- package.json
- optionalDependencies
- ManagerDashboard.tsx
- seed.ts
- ApplyLoanDto
- types.ts
- devDependencies
- RolesGuard
- ledger.service.ts
- scripts
- AdminLedger.tsx
- TransferDto
- TransactionPicker.tsx
- AdminFee.tsx
- account-number.ts
- package.json
- AdminSupply.tsx
- nest-cli.json
- moduleFileExtensions
- OptionalAuthGuard
- e2e-test.js
- AdminAudit.tsx
- eslint.config.js
- swagger-ui-dist.d.ts
- jest.config.ts
- express-rate-limit
- helmet
- @nestjs/core
- @nestjs/jwt
- @nestjs/passport
- @nestjs/platform-express
- passport
- @prisma/client
- swagger-ui-express
- uuid
- eslint-plugin-import
- jest
- eslint-config-prettier
- @nestjs/schematics
- @nestjs/testing
- prettier
- prisma
- source-map-support
- supertest
- ts-jest
- ts-loader
- ts-node
- @types/bcrypt
- @types/express
- @types/jest
- @types/jsonwebtoken
- @types/node
- @types/passport-jwt
- @types/swagger-ui-express
- @types/uuid
- typescript
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- ts-node-dev
- @types/jsonwebtoken
- @types/node
- framer-motion
- eslint.config.mjs
- next.config.ts
- next
- react
- react-dom
- zustand
- postcss.config.mjs
- Contributor Covenant Code of Conduct
- 🐳 SmartBank Docker Setup Guide
- Central Bank Core CBDC Simulation
- Tutorial Menjalankan SmartBank di Lokal (Laragon + Terminal)
- README.md
- 🔒 Production Hardening
- 🔧 Troubleshooting
- 🧪 Testing Manual
- 🎛️ Fitur Admin Bank Sentral
- SmartBank Wallet (CBDC Tier-2 Retail E-Wallet)
- Prisma Migration Guide
- notifications.module.ts
- 🚀 Quick Start (5 menit)
- Langkah 6 — Smoke Test API
- 🔌 API Reference
- 🛠️ Troubleshooting
- 📏 Konvensi Kode
- 🔍 Service Detail
- 📋 Command Reference
- Fitur Baru di Branch Ini
- package.json
- .list
- SmartBank Connector
- Langkah 1 — Konfigurasi Environment
- Langkah 5 — Jalankan 4 Services
- Reset Environment
- Langkah 3 — Migrate + Seed Central-Bank
- README.md
- Prasyarat
- 🚀 Quick Start
- AGENTS.md
- class-validator
- @nestjs/config
- @nestjs/cli
- driver.js
- AGENTS.md
- 🏗️ Arsitektur

## God Nodes (most connected - your core abstractions)
1. `PrismaService` - 52 edges
2. `SettlementService` - 41 edges
3. `RequestUser` - 37 edges
4. `CurrentUser` - 37 edges
5. `MoneyService` - 36 edges
6. `requestId()` - 30 edges
7. `fetchApi()` - 29 edges
8. `ErrorCode` - 24 edges
9. `WalletAccountService` - 24 edges
10. `requireIdempotencyKey()` - 23 edges

## Surprising Connections (you probably didn't know these)
- `ReversalPage()` --references--> `CentralBankApi`  [EXTRACTED]
  Central-Bank/frontend/src/features/transactions/ReversalPage.tsx → Central-Bank/frontend/src/api/central-bank.api.ts
- `apiRequest()` --calls--> `clearSession()`  [EXTRACTED]
  Central-Bank/frontend/src/api/client.ts → Central-Bank/frontend/src/auth/session.ts
- `apiRequest()` --calls--> `getSessionToken()`  [EXTRACTED]
  Central-Bank/frontend/src/api/client.ts → Central-Bank/frontend/src/auth/session.ts
- `LoanPage()` --references--> `LoansApi`  [EXTRACTED]
  Central-Bank/frontend/src/features/loans/LoanPage.tsx → Central-Bank/frontend/src/api/loans.api.ts
- `PaymentRequestPage()` --references--> `PaymentApi`  [EXTRACTED]
  Central-Bank/frontend/src/features/payments/PaymentRequestPage.tsx → Central-Bank/frontend/src/api/payment.api.ts

## Import Cycles
- None detected.

## Communities (175 total, 56 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.08
Nodes (34): app, authRateLimiter, __dirname, __filename, swaggerDocument, config, __dirname, __filename (+26 more)

### Community 1 - "AppShell.tsx"
Cohesion: 0.08
Nodes (12): DashboardPage(), LoginPage(), AppShell(), badgeToneClasses, MenuItem, menus, OnboardingTour(), RolePage() (+4 more)

### Community 2 - "PaymentRequestPage.tsx"
Cohesion: 0.13
Nodes (24): PaginationProps, PageHeader(), AmountInput, AmountInputProps, Button, ButtonProps, Card(), CardContent() (+16 more)

### Community 3 - "AlgorithmsController"
Cohesion: 0.11
Nodes (15): AlgorithmsController, Body, Controller, Get, Post, AlgorithmsModule, Module, BfsService (+7 more)

### Community 4 - "server.ts"
Cohesion: 0.09
Nodes (20): healthRoutes, prisma, paymentsRoutes, router, router, usersRoutes, env, envSchema (+12 more)

### Community 5 - "App.tsx"
Cohesion: 0.12
Nodes (26): LedgerApi, SupplyApi, LedgerEntry, SupplyReport, WalletTransaction, WalletApi, App(), ResponseConsole() (+18 more)

### Community 6 - "app.module.ts"
Cohesion: 0.14
Nodes (26): AuditModule, Module, AuthModule, Module, CentralBankModule, Module, FeesModule, Module (+18 more)

### Community 7 - "page.tsx"
Cohesion: 0.07
Nodes (25): container, item, LoginResponse, QUICK_ACCOUNTS, TONE_ACTIVE, container, item, LoginResponse (+17 more)

### Community 8 - "types.ts"
Cohesion: 0.11
Nodes (26): RegisterPayload, CentralBankApi, apiRequest(), client, RequestOptions, FeesApi, LoansApi, PaymentApi (+18 more)

### Community 9 - "settlement.service.ts"
Cohesion: 0.17
Nodes (9): AppError, STATUS_BY_CODE, ErrorCode, jsonSafe(), IdempotencyService, Injectable, LedgerPost, IdempotencyInput (+1 more)

### Community 10 - "CreateNotificationDto"
Cohesion: 0.09
Nodes (20): CreateNotificationDto, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ListNotificationsDto (+12 more)

### Community 11 - "dependencies"
Cohesion: 0.06
Nodes (34): bcryptjs, mysql2, dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken (+26 more)

### Community 12 - "central-bank.ts"
Cohesion: 0.12
Nodes (23): metadata, DocumentKey, documents, SwaggerDocs(), auth, bodyOp(), centralBankSpec, financialAuth (+15 more)

### Community 13 - "MoneyService"
Cohesion: 0.10
Nodes (19): FeeQuoteDto, IsIn, IsNotEmpty, IsString, Matches, MaxLength, FeeComponent, FeeQuote (+11 more)

### Community 14 - "dependencies"
Cohesion: 0.06
Nodes (30): dependencies, lucide-react, react, react-dom, react-router-dom, typescript, vite, @vitejs/plugin-react (+22 more)

### Community 15 - "compilerOptions"
Cohesion: 0.06
Nodes (30): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+22 more)

### Community 16 - "PrismaService"
Cohesion: 0.13
Nodes (8): AuditLogService, Injectable, AuthService, Injectable, PrismaService, Injectable, TellerService, Injectable

### Community 17 - "SettlementService"
Cohesion: 0.37
Nodes (3): asJson(), SettlementService, Injectable

### Community 18 - "page.tsx"
Cohesion: 0.07
Nodes (11): pillars, Tier1, Tier2, exampleFee, rows, totalBps, LandingNavbar(), sections (+3 more)

### Community 19 - "fetchApi"
Cohesion: 0.12
Nodes (21): money(), Props, shortId(), WalletPicker(), WalletSummary, AdminBurn(), AdminIssuance(), AdminReversal() (+13 more)

### Community 20 - "app.js"
Cohesion: 0.13
Nodes (26): animateNumber(), authScreen, dashboardScreen, generateLedgerHTML(), handleCooldownTimer(), limitCountDisplay, loadDashboardData(), loadLoansList() (+18 more)

### Community 21 - "page.tsx"
Cohesion: 0.10
Nodes (16): Callout(), FAQS, LOAN_FLOW, LoanFlowSection(), ONBOARDING_STEPS, OnboardingSection(), P2P_STEPS, ROLE_BENTO (+8 more)

### Community 22 - "MonetaryPolicyService"
Cohesion: 0.12
Nodes (5): Get, Param, Query, MonetaryPolicyService, Injectable

### Community 23 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+14 more)

### Community 24 - "main.ts"
Cohesion: 0.17
Nodes (16): Catch, AppModule, Module, ApiResponseInterceptor, normalize(), Injectable, HttpErrorFilter, auditRequests() (+8 more)

### Community 25 - "requireIdempotencyKey"
Cohesion: 0.22
Nodes (10): RequestUser, requireIdempotencyKey(), Roles(), PaymentRequestsController, Body, Controller, Param, Post (+2 more)

### Community 26 - "Public"
Cohesion: 0.27
Nodes (6): Public(), HealthController, Controller, Get, HealthModule, Module

### Community 27 - "auth.controller.ts"
Cohesion: 0.20
Nodes (12): AuthController, Body, Controller, Post, Req, LoginDto, RegisterDto, IsNotEmpty (+4 more)

### Community 28 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, incremental, module (+11 more)

### Community 29 - "package.json"
Cohesion: 0.10
Nodes (19): dependencies, cors, dotenv, express, http-proxy-middleware, jsonwebtoken, description, cors (+11 more)

### Community 30 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, bcrypt, class-transformer, jsonwebtoken, @nestjs/common, @nestjs/jwt, passport-jwt, reflect-metadata (+11 more)

### Community 31 - "prisma.module.ts"
Cohesion: 0.21
Nodes (8): PublicController, Controller, Get, PublicModule, Module, PublicStats, PublicStatsService, Injectable

### Community 32 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, dependencies, clsx, geist, lucide-react, next, next-themes, @radix-ui/react-icons (+11 more)

### Community 33 - "RetailDashboard.tsx"
Cohesion: 0.16
Nodes (15): ActiveLoan, AnimatedNumber(), BalanceInfo, formatAccountDisplay(), isCredit(), isValidAccountNumberFormat(), LoanLimit, LoanLimitCard() (+7 more)

### Community 34 - "InboxPage.tsx"
Cohesion: 0.19
Nodes (10): Notification, NotificationsApi, AppShell(), NotificationBell(), Topbar(), TopbarProps, ApiHealthIndicator(), EnvironmentBadge() (+2 more)

### Community 35 - "PageHeader.tsx"
Cohesion: 0.15
Nodes (12): ColumnDef, DataTable(), DataTableProps, Breadcrumb(), BreadcrumbItem, BreadcrumbProps, PageHeaderProps, EmptyState() (+4 more)

### Community 36 - "RequestUser"
Cohesion: 0.28
Nodes (11): CurrentUser, requestId(), TellerController, Body, Controller, Param, Post, Req (+3 more)

### Community 38 - "scripts"
Cohesion: 0.12
Nodes (16): concurrently, description, devDependencies, concurrently, name, private, scripts, cb:db-migrate (+8 more)

### Community 39 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, bcrypt, cors, dotenv, express, jsonwebtoken, libphonenumber-js, @prisma/client (+9 more)

### Community 40 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, jest, prisma, ts-jest, @types/bcrypt, @types/cors, @types/express, @types/jest (+9 more)

### Community 41 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+9 more)

### Community 42 - "AuthProvider.tsx"
Cohesion: 0.27
Nodes (12): AuthContext, AuthProvider(), AuthState, useAuth(), ProtectedRoute(), clearSession(), decodeJwtUser(), getSessionToken() (+4 more)

### Community 43 - "ManagerController"
Cohesion: 0.16
Nodes (13): ManagerLoanActionDto, ManagerUserActionDto, IsNotEmpty, IsOptional, IsString, MaxLength, ManagerController, Body (+5 more)

### Community 44 - ".settleViaConnector"
Cohesion: 0.11
Nodes (15): ServiceTokenGuard, Injectable, InternalSettleDto, IsNotEmpty, IsObject, IsOptional, IsString, Matches (+7 more)

### Community 45 - "server.js"
Cohesion: 0.17
Nodes (10): jwtMiddleware(), auditRequests(), createRateLimiter(), requestContext(), securityHeaders(), allowedOrigins, app, KNOWN_BAD_SECRETS (+2 more)

### Community 46 - "theme-provider.tsx"
Cohesion: 0.20
Nodes (12): metadata, applyThemeClass(), isTheme(), persistTheme(), readInitialTheme(), readSystemTheme(), ResolvedTheme, Theme (+4 more)

### Community 47 - "package.json"
Cohesion: 0.15
Nodes (13): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+5 more)

### Community 48 - "WalletAccountService"
Cohesion: 0.12
Nodes (7): ManagerService, Injectable, TransfersController, Controller, Injectable, UPGRADEABLE_ROLES, WalletAccountService

### Community 49 - "exclude"
Cohesion: 0.14
Nodes (13): compilerOptions, outDir, rootDir, exclude, extends, include, dist, frontend (+5 more)

### Community 50 - "LoginPage.tsx"
Cohesion: 0.31
Nodes (8): AuthApi, ApiError, schemas, setSessionToken(), LoginPage(), RegisterPage(), getErrorMessage(), isApiResult()

### Community 51 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, format, lint, start, start:debug, start:dev, start:prod (+5 more)

### Community 52 - "CurrentUser"
Cohesion: 0.17
Nodes (10): LoansController, Body, Controller, Get, Param, Post, Req, Body (+2 more)

### Community 53 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 54 - "teller.controller.ts"
Cohesion: 0.38
Nodes (10): KycActionDto, KycApprovalDto, KycRejectionDto, TellerActionDto, IsIn, IsNotEmpty, IsOptional, IsString (+2 more)

### Community 55 - "WalletsController"
Cohesion: 0.24
Nodes (6): InternalUsersController, Controller, Get, Param, UseGuards, UsersController

### Community 56 - "central-bank.controller.ts"
Cohesion: 0.22
Nodes (16): requestHash(), CentralBankController, Body, Controller, Post, Req, BurnDto, FeeConfigurationDto (+8 more)

### Community 57 - "AdminDashboard.tsx"
Cohesion: 0.24
Nodes (6): AdminDashboard(), AnimatedNumber(), AuditLog, money(), Supply, unwrap()

### Community 58 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (5): ErrorBoundary, Props, State, ErrorState(), ErrorStateProps

### Community 59 - "CentralBankController"
Cohesion: 0.04
Nodes (46): 10. Error Handling & Resilience, 11.1 Authentication Layers, 11.2 Authorization Rules, 11.3 Data Privacy, 11.4 Anti-Tampering (Audit Log), 11.5 Rate Limits, 11. Security, 12. Testing Strategy (+38 more)

### Community 60 - "FeeQuoteDto"
Cohesion: 0.06
Nodes (30): C1 — Live JWT_SECRET ter-commit di dokumen tracked, C2 — Mock central-bank tanpa guard produksi, C3 — Self-escalation ke MERCHANT + auto-VERIFIED KYC, CRITICAL, H1 — Race idempotency P2002 bocor jadi 500 (C4 lama, masih ada), H2 — Staff-seed reset password loop + tanpa guard prod, H3 — JWT_SECRET dipakai sebagai Bearer token ke Central-Bank, H4 — Shared symmetric JWT secret lintas service (H1 lama) (+22 more)

### Community 61 - "CreatePaymentRequestDto"
Cohesion: 0.20
Nodes (9): CreatePaymentRequestDto, IsIn, IsNotEmpty, IsObject, IsOptional, IsString, Matches, MaxLength (+1 more)

### Community 62 - "api.ts"
Cohesion: 0.28
Nodes (5): apiBaseUrl(), ApiEnvelope, apiRequest(), ApiResult, newRequestId()

### Community 63 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 64 - "optionalDependencies"
Cohesion: 0.22
Nodes (9): optionalDependencies, lightningcss-linux-x64-gnu, lightningcss-win32-x64-msvc, @tailwindcss/oxide-linux-x64-gnu, @tailwindcss/oxide-win32-x64-msvc, lightningcss-linux-x64-gnu, lightningcss-win32-x64-msvc, @tailwindcss/oxide-linux-x64-gnu (+1 more)

### Community 65 - "ManagerDashboard.tsx"
Cohesion: 0.28
Nodes (7): Customer, LoanFilter, LoanPool, ManagerDashboard(), money(), PendingLoan, unwrap()

### Community 66 - "seed.ts"
Cohesion: 0.39
Nodes (7): main(), prisma, seedInitialSupplyEvent(), seedLoanPoolFunding(), systemAccounts, upsertFeeRules(), upsertSystemAccounts()

### Community 67 - "ApplyLoanDto"
Cohesion: 0.39
Nodes (7): ApplyLoanDto, RepayLoanDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength

### Community 68 - "types.ts"
Cohesion: 0.29
Nodes (6): FeeQuote, LogEntry, PanelKey, SupplyReport, WalletBalance, WalletTransaction

### Community 69 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, eslint, eslint-config-prettier, tsconfig-paths, eslint, eslint-config-prettier, tsconfig-paths

### Community 72 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, prisma:generate, prisma:push, start, test

### Community 73 - "AdminLedger.tsx"
Cohesion: 0.43
Nodes (4): AdminLedger(), LedgerEntry, money(), unwrap()

### Community 74 - "TransferDto"
Cohesion: 0.33
Nodes (6): TransferDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength

### Community 75 - "TransactionPicker.tsx"
Cohesion: 0.47
Nodes (5): money(), Props, shortId(), TransactionPicker(), TransactionSummary

### Community 76 - "AdminFee.tsx"
Cohesion: 0.47
Nodes (5): AdminFee(), FeeConfig, money(), TX_TYPES, unwrap()

### Community 77 - "account-number.ts"
Cohesion: 0.60
Nodes (3): generateAccountNumber(), isValidAccountNumber(), luhnChecksum()

### Community 78 - "package.json"
Cohesion: 0.40
Nodes (4): description, main, name, version

### Community 79 - "AdminSupply.tsx"
Cohesion: 0.60
Nodes (4): AdminSupply(), money(), Supply, unwrap()

### Community 80 - "nest-cli.json"
Cohesion: 0.50
Nodes (3): collection, $schema, sourceRoot

### Community 81 - "moduleFileExtensions"
Cohesion: 0.13
Nodes (4): asJson(), LoanService, Injectable, asJson()

### Community 83 - "e2e-test.js"
Cohesion: 0.83
Nodes (3): createClient(), delay(), runE2ETests()

### Community 84 - "AdminAudit.tsx"
Cohesion: 0.67
Nodes (3): AdminAudit(), AuditLog, unwrap()

### Community 91 - "@nestjs/jwt"
Cohesion: 0.12
Nodes (15): Central-Bank changes, Connector service, Deployment/docs, File Structure, Frontend changes, Global Constraints, Self-Review, SmartBank Connector Implementation Plan (+7 more)

### Community 97 - "uuid"
Cohesion: 0.12
Nodes (16): ❌ Build TypeScript lambat / hang di Windows, ❌ Frontend crash: `memory allocation of 16777216 bytes failed` (exit 3221226505), ❌ Frontend error "Multiple lockfiles", ❌ Frontend "next is not recognized", ❌ Gateway return 502 UPSTREAM_UNAVAILABLE (timeout 30s), ❌ Login return 500 TypeError (getWalletByUserId is not a function), ❌ Login via Gateway return 404 "Rute tidak ditemukan", ❌ MySQL "Access denied for user 'root'@'localhost' (using password: YES)" (+8 more)

### Community 100 - "eslint-config-prettier"
Cohesion: 0.12
Nodes (16): 🙏 Acknowledgments, 🔐 Akun Pengujian, 💰 Aturan Finansial, 📑 Daftar Isi, 📚 Dokumentasi Service, Environment Variables, ✨ Highlights v2.0 — Fitur Baru, 🤝 Kontribusi (+8 more)

### Community 127 - "next"
Cohesion: 0.13
Nodes (15): 1. Lapor Bug / Request Fitur, 2. Pull Request, 3. Dokumentasi, 🚀 Cara Berkontribusi, 📜 Code of Conduct, Contributing to SmartBank, Instalasi dengan Docker, Instalasi Lokal (Tanpa Docker) (+7 more)

### Community 138 - "Contributor Covenant Code of Conduct"
Cohesion: 0.17
Nodes (12): 1. Correction, 2. Warning, 3. Temporary Ban, 4. Permanent Ban, Attribution, Contributor Covenant Code of Conduct, Enforcement, Enforcement Guidelines (+4 more)

### Community 139 - "🐳 SmartBank Docker Setup Guide"
Cohesion: 0.17
Nodes (12): 🏗 Arsitektur & Port, 📑 Daftar Isi, 🔐 Environment Variables, Monitoring Migration, Opsional (ada default), 📋 Prasyarat, 🗄 Prisma Migration di Docker, Reset Database (CAUTION: drops all data) (+4 more)

### Community 140 - "Central Bank Core CBDC Simulation"
Cohesion: 0.18
Nodes (11): Architecture, Central Bank Core CBDC Simulation, Database Schema, Endpoints, Financial Invariants, Frontend Test Client, Local Setup, Main Folder Structure (+3 more)

### Community 141 - "Tutorial Menjalankan SmartBank di Lokal (Laragon + Terminal)"
Cohesion: 0.20
Nodes (10): Akun untuk Testing, Arsitektur Lokal, Catatan: Frontend pakai WebGL 3D, Daftar Isi, Langkah 0 — Install Dependencies, Langkah 2 — Buat Database MySQL, Langkah 4 — Buat Tabel Cache Wallet, Langkah 7 — Akses Frontend (+2 more)

### Community 143 - "🔒 Production Hardening"
Cohesion: 0.25
Nodes (8): 1. Secrets Management, 2. HTTPS / Reverse Proxy, 3. Database Backup, 4. Resource Limits, 5. Logging, 6. Healthcheck di Orchestrator, 7. Image Registry, 🔒 Production Hardening

### Community 144 - "🔧 Troubleshooting"
Cohesion: 0.25
Nodes (8): Container restart loop, Frontend tidak bisa hit Gateway, Migration gagal di boot, MySQL port 3301 sudah dipakai, Out of disk space, Reset total (factory reset), Seed error: `ER_DUP_ENTRY` di restart kedua, 🔧 Troubleshooting

### Community 145 - "🧪 Testing Manual"
Cohesion: 0.25
Nodes (8): 1. Verifikasi Stack, 2. Registrasi Dua Pengguna Retail, 3. Testing Teller, 4. Testing Transfer Retail, 5. Testing Pinjaman, 6. Testing Admin Bank Sentral, Hasil Minimum yang Diharapkan, 🧪 Testing Manual

### Community 146 - "🎛️ Fitur Admin Bank Sentral"
Cohesion: 0.25
Nodes (8): 📜 Audit Log, 🔥 Burn (Musnahkan CBDC), ⚙️ Fee Configuration, 🎛️ Fitur Admin Bank Sentral, 💸 Issuance (Cetak CBDC), 🔍 Ledger Browser, ⏪ Reversal (Balikkan Transaksi), 📊 Supply Monitor

### Community 147 - "SmartBank Wallet (CBDC Tier-2 Retail E-Wallet)"
Cohesion: 0.25
Nodes (7): Arsitektur Simulasi, Development Commands, Instalasi dan Menjalankan (Development), Integrasi Central Bank Core & Mode Simulasi, Kontrak API (Gambaran Umum), SmartBank Wallet (CBDC Tier-2 Retail E-Wallet), Struktur Project

### Community 148 - "Prisma Migration Guide"
Cohesion: 0.29
Nodes (7): Common Commands, Docker / Production (in-container), Local Development (Laragon / host MySQL), Prisma Migration Guide, Schema & Migrations Overview, Seed Idempotency, Troubleshooting

### Community 149 - "notifications.module.ts"
Cohesion: 0.33
Nodes (5): NotificationsModule, Module, PrismaModule, Module, Global

### Community 150 - "🚀 Quick Start (5 menit)"
Cohesion: 0.29
Nodes (7): 1. Clone & masuk folder, 2. Copy env template, 3. Build & start semua service, 4. Tunggu healthcheck pass (~30-60 detik), 5. Verifikasi, 6. Login dengan akun dummy, 🚀 Quick Start (5 menit)

### Community 151 - "Langkah 6 — Smoke Test API"
Cohesion: 0.29
Nodes (7): 6.1 Health Check Semua Service, 6.2 E2E Test: Register → Login → Balance → Transaksi, 6.3 Test Admin Endpoints (Issuance, Burn, Fee, Audit), 6.4 Test Algorithm Endpoints (BFS/DFS/KMP/Greedy), 6.5 Test Login Staff (Teller / Manager / Admin), 6.6 Test Transfer P2P (opsional, butuh 2 user retail), Langkah 6 — Smoke Test API

### Community 152 - "🔌 API Reference"
Cohesion: 0.29
Nodes (7): 🔌 API Reference, Base URL, Endpoint Central Bank, Endpoint Wallet, Format Respons, Header Standar, Testing API dengan PowerShell

### Community 153 - "🛠️ Troubleshooting"
Cohesion: 0.29
Nodes (7): Container tidak healthy, Error cooldown atau daily limit, Frontend menampilkan 502, Login staf gagal, Migration drift / db push warning, Port sudah digunakan, 🛠️ Troubleshooting

### Community 154 - "📏 Konvensi Kode"
Cohesion: 0.33
Nodes (6): Backend (NestJS) Pattern, Branch Naming, Code Style, Commit Messages, Frontend (Next.js + React) Pattern, 📏 Konvensi Kode

### Community 155 - "🔍 Service Detail"
Cohesion: 0.33
Nodes (6): Central-Bank, Frontend, Gateway, MySQL, 🔍 Service Detail, Wallet

### Community 156 - "📋 Command Reference"
Cohesion: 0.33
Nodes (6): 📋 Command Reference, Exec ke Container, Lifecycle, Logs, Rebuild Specific Service, Resource Usage

### Community 157 - "Fitur Baru di Branch Ini"
Cohesion: 0.33
Nodes (6): 1. 6 Route Admin Baru, 2. Module Algoritma (Modul Praktikum 2026), 3. Redesign Frontend, 4. Database Schema Baru, 5. Dependency Frontend Baru, Fitur Baru di Branch Ini

### Community 158 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 160 - "SmartBank Connector"
Cohesion: 0.40
Nodes (4): Setup, SmartBank Connector, Stack, Testing

### Community 161 - "Langkah 1 — Konfigurasi Environment"
Cohesion: 0.40
Nodes (5): 1.1 `Central-Bank/.env`, 1.2 `Wallet/.env`, 1.3 `Gateway/.env`, 1.4 `frontend/.env.local`, Langkah 1 — Konfigurasi Environment

### Community 162 - "Langkah 5 — Jalankan 4 Services"
Cohesion: 0.40
Nodes (5): Langkah 5 — Jalankan 4 Services, Tab 1 — Central-Bank (port 3000), Tab 2 — Wallet (port 6969), Tab 3 — Gateway (port 4000), Tab 4 — Frontend (port 3001)

### Community 163 - "Reset Environment"
Cohesion: 0.40
Nodes (5): Reset Database (hapus semua data, ulang dari nol), Reset Environment, Reset Frontend Cache (`.next` folder), Reset Node Modules (kalau ada konflik dependency), Stop Semua Service

### Community 164 - "Langkah 3 — Migrate + Seed Central-Bank"
Cohesion: 0.50
Nodes (4): Langkah 3 — Migrate + Seed Central-Bank, Opsi A — Prisma Migrate (untuk database fresh), Opsi B — Prisma DB Push (sync schema langsung, lebih cepat), Seed data awal

### Community 165 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 166 - "Prasyarat"
Cohesion: 0.67
Nodes (3): Prasyarat, Rekomendasi Hardware (untuk Frontend dengan 3D WebGL), Verifikasi awal (wajib)

### Community 167 - "🚀 Quick Start"
Cohesion: 0.67
Nodes (3): Dengan Docker (direkomendasikan), 🚀 Quick Start, Tanpa Docker (Laragon + MySQL lokal)

## Knowledge Gaps
- **708 isolated node(s):** `ts`, `tsParser`, `name`, `version`, `private` (+703 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **56 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RequestUser` connect `requireIdempotencyKey` to `RequestUser`, `settlement.service.ts`, `CreateNotificationDto`, `ManagerController`, `CurrentUser`, `teller.controller.ts`, `central-bank.controller.ts`, `.list`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `RequestUser` to `settlement.service.ts`, `CreateNotificationDto`, `ManagerController`, `CurrentUser`, `teller.controller.ts`, `central-bank.controller.ts`, `requireIdempotencyKey`, `.list`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `PrismaService` connect `PrismaService` to `settlement.service.ts`, `CreateNotificationDto`, `MoneyService`, `WalletAccountService`, `moduleFileExtensions`, `SettlementService`, `notifications.module.ts`, `MonetaryPolicyService`, `prisma.module.ts`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `ts`, `tsParser`, `name` to the rest of the system?**
  _708 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0771478667445938 - nodes in this community are weakly interconnected._
- **Should `AppShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08156028368794327 - nodes in this community are weakly interconnected._
- **Should `PaymentRequestPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12790697674418605 - nodes in this community are weakly interconnected._