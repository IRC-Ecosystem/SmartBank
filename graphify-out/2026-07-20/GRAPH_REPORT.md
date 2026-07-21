# Graph Report - SmartBank  (2026-07-18)

## Corpus Check
- 315 files · ~131,716 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2037 nodes · 3797 edges · 168 communities (118 shown, 50 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 14 edges (avg confidence: 0.63)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5056312d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.js
- AppShell.tsx
- SmartBank Connector Service — Design Spec
- PaymentRequestPage.tsx
- MoneyService
- AlgorithmsController
- env.ts
- App.tsx
- notification.controller.ts
- page.tsx
- types.ts
- settlement.service.ts
- dependencies
- PrismaService
- central-bank.ts
- dependencies
- compilerOptions
- SettlementService
- app.module.ts
- requestId
- manager.controller.ts
- page.tsx
- fetchApi
- Public
- app.js
- page.tsx
- CurrentUser
- MonetaryPolicyService
- requireIdempotencyKey
- compilerOptions
- main.ts
- compilerOptions
- package.json
- dependencies
- dependencies
- RetailDashboard.tsx
- InboxPage.tsx
- PageHeader.tsx
- 🐳 SmartBank Docker Setup Guide
- dependencies
- auth.controller.ts
- scripts
- devDependencies
- devDependencies
- AuthProvider.tsx
- class-validator
- .repay
- CreatePaymentRequestDto
- SmartBank Connector Implementation Plan
- Troubleshooting
- server.js
- 🏦 SmartBank CBDC Integration
- public.module.ts
- Contributing to SmartBank
- theme-provider.tsx
- exclude
- LoginPage.tsx
- jest
- scripts
- compilerOptions
- Contributor Covenant Code of Conduct
- setup-local-db.js
- Central Bank Core CBDC Simulation
- .getUserByPhone
- AdminDashboard.tsx
- ErrorBoundary.tsx
- Tutorial Menjalankan SmartBank di Lokal (Laragon + Terminal)
- api.ts
- scripts
- run-prisma.js
- package.json
- optionalDependencies
- ManagerDashboard.tsx
- seed.ts
- ApplyLoanDto
- 🔒 Production Hardening
- 🔧 Troubleshooting
- 🧪 Testing Manual
- 🎛️ Fitur Admin Bank Sentral
- SmartBank Wallet (CBDC Tier-2 Retail E-Wallet)
- types.ts
- devDependencies
- Prisma Migration Guide
- RolesGuard
- 🚀 Quick Start (5 menit)
- Langkah 6 — Smoke Test API
- AdminLedger.tsx
- 🔌 API Reference
- 🛠️ Troubleshooting
- ledger.service.ts
- TransferDto
- .pendingLoans
- 📏 Konvensi Kode
- 📋 Command Reference
- Fitur Baru di Branch Ini
- TransactionPicker.tsx
- AdminFee.tsx
- package.json
- account-number.ts
- package.json
- SmartBank Connector
- Langkah 1 — Konfigurasi Environment
- Langkah 5 — Jalankan 4 Services
- Reset Environment
- AdminSupply.tsx
- nest-cli.json
- OptionalAuthGuard
- Langkah 3 — Migrate + Seed Central-Bank
- e2e-test.js
- README.md
- AdminAudit.tsx
- eslint.config.js
- Prasyarat
- swagger-ui-dist.d.ts
- 🚀 Quick Start
- jest.config.ts
- express-rate-limit
- helmet
- @nestjs/config
- @nestjs/core
- framer-motion
- @nestjs/passport
- @nestjs/platform-express
- passport
- @prisma/client
- swagger-ui-express
- eslint-plugin-import
- jest
- @nestjs/cli
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
- eslint-config-prettier
- @types/jest
- @types/express
- eslint.config.mjs
- next.config.ts
- next
- next-themes
- react
- react-dom
- zustand
- postcss.config.mjs
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
- `apiRequest()` --calls--> `clearSession()`  [EXTRACTED]
  Central-Bank/frontend/src/api/client.ts → Central-Bank/frontend/src/auth/session.ts
- `apiRequest()` --calls--> `getSessionToken()`  [EXTRACTED]
  Central-Bank/frontend/src/api/client.ts → Central-Bank/frontend/src/auth/session.ts
- `DashboardPage()` --calls--> `useAuth()`  [EXTRACTED]
  Central-Bank/frontend/src/features/dashboard/DashboardPage.tsx → Central-Bank/frontend/src/auth/AuthProvider.tsx
- `LedgerExplorerPage()` --calls--> `useToast()`  [EXTRACTED]
  Central-Bank/frontend/src/features/ledger/LedgerExplorerPage.tsx → Central-Bank/frontend/src/components/feedback/ToastProvider.tsx
- `LoanPage()` --calls--> `useToast()`  [EXTRACTED]
  Central-Bank/frontend/src/features/loans/LoanPage.tsx → Central-Bank/frontend/src/components/feedback/ToastProvider.tsx

## Import Cycles
- None detected.

## Communities (168 total, 50 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.08
Nodes (34): app, authRateLimiter, __dirname, __filename, swaggerDocument, config, __dirname, __filename (+26 more)

### Community 1 - "AppShell.tsx"
Cohesion: 0.08
Nodes (12): DashboardPage(), LoginPage(), AppShell(), badgeToneClasses, MenuItem, menus, OnboardingTour(), RolePage() (+4 more)

### Community 2 - "SmartBank Connector Service — Design Spec"
Cohesion: 0.04
Nodes (46): 10. Error Handling & Resilience, 11.1 Authentication Layers, 11.2 Authorization Rules, 11.3 Data Privacy, 11.4 Anti-Tampering (Audit Log), 11.5 Rate Limits, 11. Security, 12. Testing Strategy (+38 more)

### Community 3 - "PaymentRequestPage.tsx"
Cohesion: 0.13
Nodes (24): PaginationProps, PageHeader(), AmountInput, AmountInputProps, Button, ButtonProps, Card(), CardContent() (+16 more)

### Community 4 - "MoneyService"
Cohesion: 0.09
Nodes (20): FeeQuoteDto, IsIn, IsNotEmpty, IsString, Matches, MaxLength, FeeComponent, FeeQuote (+12 more)

### Community 5 - "AlgorithmsController"
Cohesion: 0.11
Nodes (15): AlgorithmsController, Body, Controller, Get, Post, AlgorithmsModule, Module, BfsService (+7 more)

### Community 6 - "env.ts"
Cohesion: 0.07
Nodes (30): healthRoutes, prisma, paymentSchema, paymentsRoutes, router, linkSchema, otpRequestSchema, otpVerifySchema (+22 more)

### Community 7 - "App.tsx"
Cohesion: 0.12
Nodes (24): LedgerApi, LoansApi, SupplyApi, TransferApi, LedgerEntry, SupplyReport, WalletApi, App() (+16 more)

### Community 8 - "notification.controller.ts"
Cohesion: 0.12
Nodes (12): NotificationController, Body, Controller, Get, Param, Post, Query, UseGuards (+4 more)

### Community 9 - "page.tsx"
Cohesion: 0.07
Nodes (25): container, item, LoginResponse, QUICK_ACCOUNTS, TONE_ACTIVE, container, item, LoginResponse (+17 more)

### Community 10 - "types.ts"
Cohesion: 0.13
Nodes (23): RegisterPayload, apiRequest(), client, RequestOptions, FeesApi, PaymentRequestsApi, TransfersApi, ApiEnvelope (+15 more)

### Community 11 - "settlement.service.ts"
Cohesion: 0.17
Nodes (9): AppError, STATUS_BY_CODE, ErrorCode, jsonSafe(), IdempotencyService, Injectable, LedgerPost, IdempotencyInput (+1 more)

### Community 12 - "dependencies"
Cohesion: 0.06
Nodes (34): bcryptjs, mysql2, dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken (+26 more)

### Community 13 - "PrismaService"
Cohesion: 0.11
Nodes (7): ManagerService, Injectable, TransfersController, Controller, Injectable, UPGRADEABLE_ROLES, WalletAccountService

### Community 14 - "central-bank.ts"
Cohesion: 0.12
Nodes (23): metadata, DocumentKey, documents, SwaggerDocs(), auth, bodyOp(), centralBankSpec, financialAuth (+15 more)

### Community 15 - "dependencies"
Cohesion: 0.06
Nodes (30): dependencies, lucide-react, react, react-dom, react-router-dom, typescript, vite, @vitejs/plugin-react (+22 more)

### Community 16 - "compilerOptions"
Cohesion: 0.06
Nodes (30): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+22 more)

### Community 17 - "SettlementService"
Cohesion: 0.37
Nodes (3): asJson(), SettlementService, Injectable

### Community 18 - "app.module.ts"
Cohesion: 0.07
Nodes (41): OptionalAuthGuard, Injectable, RolesGuard, Injectable, AuditModule, Module, AuthModule, Module (+33 more)

### Community 19 - "requestId"
Cohesion: 0.23
Nodes (13): CurrentUser, RequestUser, requestId(), TellerController, Body, Controller, Param, Post (+5 more)

### Community 20 - "manager.controller.ts"
Cohesion: 0.17
Nodes (13): ManagerLoanActionDto, ManagerUserActionDto, IsNotEmpty, IsOptional, IsString, MaxLength, ManagerController, Body (+5 more)

### Community 21 - "page.tsx"
Cohesion: 0.07
Nodes (11): pillars, Tier1, Tier2, exampleFee, rows, totalBps, LandingNavbar(), sections (+3 more)

### Community 22 - "fetchApi"
Cohesion: 0.12
Nodes (21): money(), Props, shortId(), WalletPicker(), WalletSummary, AdminBurn(), AdminIssuance(), AdminReversal() (+13 more)

### Community 23 - "Public"
Cohesion: 0.27
Nodes (6): Public(), HealthController, Controller, Get, HealthModule, Module

### Community 24 - "app.js"
Cohesion: 0.13
Nodes (26): animateNumber(), authScreen, dashboardScreen, generateLedgerHTML(), handleCooldownTimer(), limitCountDisplay, loadDashboardData(), loadLoansList() (+18 more)

### Community 25 - "page.tsx"
Cohesion: 0.10
Nodes (16): Callout(), FAQS, LOAN_FLOW, LoanFlowSection(), ONBOARDING_STEPS, OnboardingSection(), P2P_STEPS, ROLE_BENTO (+8 more)

### Community 26 - "CurrentUser"
Cohesion: 0.38
Nodes (10): KycActionDto, KycApprovalDto, KycRejectionDto, TellerActionDto, IsIn, IsNotEmpty, IsOptional, IsString (+2 more)

### Community 27 - "MonetaryPolicyService"
Cohesion: 0.12
Nodes (8): CentralBankController, Controller, Get, Param, Query, MonetaryPolicyService, Injectable, Put

### Community 28 - "requireIdempotencyKey"
Cohesion: 0.20
Nodes (12): requestHash(), requireIdempotencyKey(), Body, Post, Req, Body, Param, Post (+4 more)

### Community 29 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+14 more)

### Community 30 - "main.ts"
Cohesion: 0.17
Nodes (16): Catch, AppModule, Module, ApiResponseInterceptor, normalize(), Injectable, HttpErrorFilter, auditRequests() (+8 more)

### Community 31 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, incremental, module (+11 more)

### Community 32 - "package.json"
Cohesion: 0.10
Nodes (19): dependencies, cors, dotenv, express, http-proxy-middleware, jsonwebtoken, description, cors (+11 more)

### Community 33 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, bcrypt, class-transformer, class-validator, jsonwebtoken, @nestjs/common, passport-jwt, reflect-metadata (+11 more)

### Community 34 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, driver.js, framer-motion, dependencies, clsx, driver.js, framer-motion, geist (+11 more)

### Community 35 - "RetailDashboard.tsx"
Cohesion: 0.16
Nodes (15): ActiveLoan, AnimatedNumber(), BalanceInfo, formatAccountDisplay(), isCredit(), isValidAccountNumberFormat(), LoanLimit, LoanLimitCard() (+7 more)

### Community 36 - "InboxPage.tsx"
Cohesion: 0.18
Nodes (11): Notification, NotificationsApi, AppShell(), NotificationBell(), Topbar(), TopbarProps, ApiHealthIndicator(), EnvironmentBadge() (+3 more)

### Community 37 - "PageHeader.tsx"
Cohesion: 0.15
Nodes (12): ColumnDef, DataTable(), DataTableProps, Breadcrumb(), BreadcrumbItem, BreadcrumbProps, PageHeaderProps, EmptyState() (+4 more)

### Community 38 - "🐳 SmartBank Docker Setup Guide"
Cohesion: 0.04
Nodes (47): 1. Clone & masuk folder, 1. Secrets Management, 2. Copy env template, 2. HTTPS / Reverse Proxy, 3. Build & start semua service, 3. Database Backup, 4. Resource Limits, 4. Tunggu healthcheck pass (~30-60 detik) (+39 more)

### Community 39 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, bcrypt, cors, dotenv, express, jsonwebtoken, libphonenumber-js, @prisma/client (+9 more)

### Community 40 - "auth.controller.ts"
Cohesion: 0.20
Nodes (12): AuthController, Body, Controller, Post, Req, LoginDto, RegisterDto, IsNotEmpty (+4 more)

### Community 41 - "scripts"
Cohesion: 0.10
Nodes (19): concurrently, docx, dependencies, docx, description, devDependencies, concurrently, name (+11 more)

### Community 42 - "devDependencies"
Cohesion: 0.12
Nodes (17): devDependencies, jest, ts-jest, ts-node-dev, @types/bcrypt, @types/cors, @types/jsonwebtoken, @types/node (+9 more)

### Community 43 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+9 more)

### Community 44 - "AuthProvider.tsx"
Cohesion: 0.27
Nodes (12): AuthContext, AuthProvider(), AuthState, useAuth(), ProtectedRoute(), clearSession(), decodeJwtUser(), getSessionToken() (+4 more)

### Community 45 - "class-validator"
Cohesion: 0.13
Nodes (13): InternalSettleDto, IsNotEmpty, IsObject, IsOptional, IsString, Matches, MaxLength, InternalSettlementController (+5 more)

### Community 47 - "CreatePaymentRequestDto"
Cohesion: 0.12
Nodes (16): Roles(), CreatePaymentRequestDto, IsIn, IsNotEmpty, IsObject, IsOptional, IsString, Matches (+8 more)

### Community 48 - "SmartBank Connector Implementation Plan"
Cohesion: 0.12
Nodes (15): Central-Bank changes, Connector service, Deployment/docs, File Structure, Frontend changes, Global Constraints, Self-Review, SmartBank Connector Implementation Plan (+7 more)

### Community 49 - "Troubleshooting"
Cohesion: 0.12
Nodes (16): ❌ Build TypeScript lambat / hang di Windows, ❌ Frontend crash: `memory allocation of 16777216 bytes failed` (exit 3221226505), ❌ Frontend error "Multiple lockfiles", ❌ Frontend "next is not recognized", ❌ Gateway return 502 UPSTREAM_UNAVAILABLE (timeout 30s), ❌ Login return 500 TypeError (getWalletByUserId is not a function), ❌ Login via Gateway return 404 "Rute tidak ditemukan", ❌ MySQL "Access denied for user 'root'@'localhost' (using password: YES)" (+8 more)

### Community 50 - "server.js"
Cohesion: 0.17
Nodes (10): jwtMiddleware(), auditRequests(), createRateLimiter(), requestContext(), securityHeaders(), allowedOrigins, app, KNOWN_BAD_SECRETS (+2 more)

### Community 51 - "🏦 SmartBank CBDC Integration"
Cohesion: 0.12
Nodes (16): 🙏 Acknowledgments, 🔐 Akun Pengujian, 💰 Aturan Finansial, 📑 Daftar Isi, 📚 Dokumentasi Service, Environment Variables, ✨ Highlights v2.0 — Fitur Baru, 🤝 Kontribusi (+8 more)

### Community 52 - "public.module.ts"
Cohesion: 0.23
Nodes (7): ServiceTokenGuard, Injectable, ListNotificationsDto, IsEnum, IsOptional, NotificationsModule, Module

### Community 53 - "Contributing to SmartBank"
Cohesion: 0.20
Nodes (10): 1. Lapor Bug / Request Fitur, 2. Pull Request, 3. Dokumentasi, 🚀 Cara Berkontribusi, 📜 Code of Conduct, Contributing to SmartBank, 🔒 Keamanan, 📞 Kontak (+2 more)

### Community 54 - "theme-provider.tsx"
Cohesion: 0.20
Nodes (12): metadata, applyThemeClass(), isTheme(), persistTheme(), readInitialTheme(), readSystemTheme(), ResolvedTheme, Theme (+4 more)

### Community 55 - "exclude"
Cohesion: 0.14
Nodes (13): compilerOptions, outDir, rootDir, exclude, extends, include, dist, frontend (+5 more)

### Community 56 - "LoginPage.tsx"
Cohesion: 0.22
Nodes (13): AuthApi, CentralBankApi, ApiError, PaymentApi, schemas, setSessionToken(), useToast(), LoginPage() (+5 more)

### Community 57 - "jest"
Cohesion: 0.15
Nodes (13): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+5 more)

### Community 58 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, build, format, lint, start, start:debug, start:dev, start:prod (+5 more)

### Community 59 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 60 - "Contributor Covenant Code of Conduct"
Cohesion: 0.29
Nodes (7): Attribution, Contributor Covenant Code of Conduct, Enforcement, Enforcement Responsibilities, Our Pledge, Our Standards, Scope

### Community 61 - "setup-local-db.js"
Cohesion: 0.17
Nodes (8): args, connectorRoot, dotenv, fs, mysql, path, result, { spawnSync }

### Community 62 - "Central Bank Core CBDC Simulation"
Cohesion: 0.18
Nodes (11): Architecture, Central Bank Core CBDC Simulation, Database Schema, Endpoints, Financial Invariants, Frontend Test Client, Local Setup, Main Folder Structure (+3 more)

### Community 63 - ".getUserByPhone"
Cohesion: 0.24
Nodes (6): InternalUsersController, Controller, Get, Param, UseGuards, UsersController

### Community 64 - "AdminDashboard.tsx"
Cohesion: 0.24
Nodes (6): AdminDashboard(), AnimatedNumber(), AuditLog, money(), Supply, unwrap()

### Community 65 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (5): ErrorBoundary, Props, State, ErrorState(), ErrorStateProps

### Community 66 - "Tutorial Menjalankan SmartBank di Lokal (Laragon + Terminal)"
Cohesion: 0.20
Nodes (10): Akun untuk Testing, Arsitektur Lokal, Catatan: Frontend pakai WebGL 3D, Daftar Isi, Langkah 0 — Install Dependencies, Langkah 2 — Buat Database MySQL, Langkah 4 — Buat Tabel Cache Wallet, Langkah 7 — Akses Frontend (+2 more)

### Community 67 - "api.ts"
Cohesion: 0.28
Nodes (5): apiBaseUrl(), ApiEnvelope, apiRequest(), ApiResult, newRequestId()

### Community 68 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:setup, dev, prisma:generate, prisma:push, prisma:validate, seed:service-key (+2 more)

### Community 69 - "run-prisma.js"
Cohesion: 0.22
Nodes (7): connectorRoot, dotenv, path, prismaCli, result, { spawnSync }, workspaceRoot

### Community 70 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 71 - "optionalDependencies"
Cohesion: 0.22
Nodes (9): optionalDependencies, lightningcss-linux-x64-gnu, lightningcss-win32-x64-msvc, @tailwindcss/oxide-linux-x64-gnu, @tailwindcss/oxide-win32-x64-msvc, lightningcss-linux-x64-gnu, lightningcss-win32-x64-msvc, @tailwindcss/oxide-linux-x64-gnu (+1 more)

### Community 72 - "ManagerDashboard.tsx"
Cohesion: 0.28
Nodes (7): Customer, LoanFilter, LoanPool, ManagerDashboard(), money(), PendingLoan, unwrap()

### Community 73 - "seed.ts"
Cohesion: 0.39
Nodes (7): main(), prisma, seedInitialSupplyEvent(), seedLoanPoolFunding(), systemAccounts, upsertFeeRules(), upsertSystemAccounts()

### Community 74 - "ApplyLoanDto"
Cohesion: 0.22
Nodes (10): ApplyLoanDto, RepayLoanDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, LoansController (+2 more)

### Community 75 - "🔒 Production Hardening"
Cohesion: 0.47
Nodes (9): BurnDto, FeeConfigurationDto, IssuanceDto, ReversalDto, IsNotEmpty, IsOptional, IsString, Matches (+1 more)

### Community 76 - "🔧 Troubleshooting"
Cohesion: 0.18
Nodes (9): bcrypt, connectorRoot, crypto, dotenv, path, prisma, { PrismaClient }, serviceName (+1 more)

### Community 77 - "🧪 Testing Manual"
Cohesion: 0.25
Nodes (8): 1. Verifikasi Stack, 2. Registrasi Dua Pengguna Retail, 3. Testing Teller, 4. Testing Transfer Retail, 5. Testing Pinjaman, 6. Testing Admin Bank Sentral, Hasil Minimum yang Diharapkan, 🧪 Testing Manual

### Community 78 - "🎛️ Fitur Admin Bank Sentral"
Cohesion: 0.25
Nodes (8): 📜 Audit Log, 🔥 Burn (Musnahkan CBDC), ⚙️ Fee Configuration, 🎛️ Fitur Admin Bank Sentral, 💸 Issuance (Cetak CBDC), 🔍 Ledger Browser, ⏪ Reversal (Balikkan Transaksi), 📊 Supply Monitor

### Community 79 - "SmartBank Wallet (CBDC Tier-2 Retail E-Wallet)"
Cohesion: 0.25
Nodes (7): Arsitektur Simulasi, Development Commands, Instalasi dan Menjalankan (Development), Integrasi Central Bank Core & Mode Simulasi, Kontrak API (Gambaran Umum), SmartBank Wallet (CBDC Tier-2 Retail E-Wallet), Struktur Project

### Community 80 - "types.ts"
Cohesion: 0.29
Nodes (6): FeeQuote, LogEntry, PanelKey, SupplyReport, WalletBalance, WalletTransaction

### Community 81 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, eslint, prisma, tsconfig-paths, eslint, prisma, tsconfig-paths

### Community 82 - "Prisma Migration Guide"
Cohesion: 0.29
Nodes (7): Common Commands, Docker / Production (in-container), Local Development (Laragon / host MySQL), Prisma Migration Guide, Schema & Migrations Overview, Seed Idempotency, Troubleshooting

### Community 83 - "RolesGuard"
Cohesion: 0.20
Nodes (3): asJson(), LoanService, Injectable

### Community 84 - "🚀 Quick Start (5 menit)"
Cohesion: 0.40
Nodes (5): 1. Correction, 2. Warning, 3. Temporary Ban, 4. Permanent Ban, Enforcement Guidelines

### Community 85 - "Langkah 6 — Smoke Test API"
Cohesion: 0.29
Nodes (7): 6.1 Health Check Semua Service, 6.2 E2E Test: Register → Login → Balance → Transaksi, 6.3 Test Admin Endpoints (Issuance, Burn, Fee, Audit), 6.4 Test Algorithm Endpoints (BFS/DFS/KMP/Greedy), 6.5 Test Login Staff (Teller / Manager / Admin), 6.6 Test Transfer P2P (opsional, butuh 2 user retail), Langkah 6 — Smoke Test API

### Community 86 - "AdminLedger.tsx"
Cohesion: 0.43
Nodes (4): AdminLedger(), LedgerEntry, money(), unwrap()

### Community 87 - "🔌 API Reference"
Cohesion: 0.29
Nodes (7): 🔌 API Reference, Base URL, Endpoint Central Bank, Endpoint Wallet, Format Respons, Header Standar, Testing API dengan PowerShell

### Community 88 - "🛠️ Troubleshooting"
Cohesion: 0.29
Nodes (7): Container tidak healthy, Error cooldown atau daily limit, Frontend menampilkan 502, Login staf gagal, Migration drift / db push warning, Port sudah digunakan, 🛠️ Troubleshooting

### Community 90 - "ledger.service.ts"
Cohesion: 0.40
Nodes (5): Instalasi dengan Docker, Instalasi Lokal (Tanpa Docker), Menjalankan Test, Prasyarat, 🏗️ Setup Development

### Community 91 - "TransferDto"
Cohesion: 0.33
Nodes (6): TransferDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength

### Community 92 - ".pendingLoans"
Cohesion: 0.13
Nodes (8): AuditLogService, Injectable, AuthService, Injectable, PrismaService, Injectable, TellerService, Injectable

### Community 93 - "📏 Konvensi Kode"
Cohesion: 0.33
Nodes (6): Backend (NestJS) Pattern, Branch Naming, Code Style, Commit Messages, Frontend (Next.js + React) Pattern, 📏 Konvensi Kode

### Community 95 - "Fitur Baru di Branch Ini"
Cohesion: 0.33
Nodes (6): 1. 6 Route Admin Baru, 2. Module Algoritma (Modul Praktikum 2026), 3. Redesign Frontend, 4. Database Schema Baru, 5. Dependency Frontend Baru, Fitur Baru di Branch Ini

### Community 96 - "TransactionPicker.tsx"
Cohesion: 0.47
Nodes (5): money(), Props, shortId(), TransactionPicker(), TransactionSummary

### Community 97 - "AdminFee.tsx"
Cohesion: 0.47
Nodes (5): AdminFee(), FeeConfig, money(), TX_TYPES, unwrap()

### Community 98 - "package.json"
Cohesion: 0.40
Nodes (4): description, name, private, version

### Community 99 - "account-number.ts"
Cohesion: 0.60
Nodes (3): generateAccountNumber(), isValidAccountNumber(), luhnChecksum()

### Community 100 - "package.json"
Cohesion: 0.40
Nodes (4): description, main, name, version

### Community 101 - "SmartBank Connector"
Cohesion: 0.40
Nodes (4): Local setup (Terminal + Laragon), SmartBank Connector, Stack, Testing

### Community 102 - "Langkah 1 — Konfigurasi Environment"
Cohesion: 0.40
Nodes (5): 1.1 `Central-Bank/.env`, 1.2 `Wallet/.env`, 1.3 `Gateway/.env`, 1.4 `frontend/.env.local`, Langkah 1 — Konfigurasi Environment

### Community 103 - "Langkah 5 — Jalankan 4 Services"
Cohesion: 0.40
Nodes (5): Langkah 5 — Jalankan 4 Services, Tab 1 — Central-Bank (port 3000), Tab 2 — Wallet (port 6969), Tab 3 — Gateway (port 4000), Tab 4 — Frontend (port 3001)

### Community 104 - "Reset Environment"
Cohesion: 0.40
Nodes (5): Reset Database (hapus semua data, ulang dari nol), Reset Environment, Reset Frontend Cache (`.next` folder), Reset Node Modules (kalau ada konflik dependency), Stop Semua Service

### Community 105 - "AdminSupply.tsx"
Cohesion: 0.60
Nodes (4): AdminSupply(), money(), Supply, unwrap()

### Community 106 - "nest-cli.json"
Cohesion: 0.50
Nodes (3): collection, $schema, sourceRoot

### Community 107 - "OptionalAuthGuard"
Cohesion: 0.29
Nodes (7): CreateNotificationDto, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength

### Community 108 - "Langkah 3 — Migrate + Seed Central-Bank"
Cohesion: 0.50
Nodes (4): Langkah 3 — Migrate + Seed Central-Bank, Opsi A — Prisma Migrate (untuk database fresh), Opsi B — Prisma DB Push (sync schema langsung, lebih cepat), Seed data awal

### Community 109 - "e2e-test.js"
Cohesion: 0.83
Nodes (3): createClient(), delay(), runE2ETests()

### Community 110 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 111 - "AdminAudit.tsx"
Cohesion: 0.67
Nodes (3): AdminAudit(), AuditLog, unwrap()

### Community 113 - "Prasyarat"
Cohesion: 0.67
Nodes (3): Prasyarat, Rekomendasi Hardware (untuk Frontend dengan 3D WebGL), Verifikasi awal (wajib)

### Community 115 - "🚀 Quick Start"
Cohesion: 0.67
Nodes (3): Dengan Docker (direkomendasikan), 🚀 Quick Start, Tanpa Docker (Laragon + MySQL lokal)

## Knowledge Gaps
- **715 isolated node(s):** `ts`, `tsParser`, `name`, `version`, `private` (+710 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MoneyService` connect `MoneyService` to `ApplyLoanDto`, `settlement.service.ts`, `🔒 Production Hardening`, `PrismaService`, `CreatePaymentRequestDto`, `.pendingLoans`, `app.module.ts`, `RolesGuard`, `manager.controller.ts`, `CurrentUser`, `MonetaryPolicyService`, `requireIdempotencyKey`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `PrismaService` connect `.pendingLoans` to `MoneyService`, `notification.controller.ts`, `settlement.service.ts`, `PrismaService`, `SettlementService`, `app.module.ts`, `RolesGuard`, `public.module.ts`, `MonetaryPolicyService`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `CurrentUser` connect `requestId` to `notification.controller.ts`, `ApplyLoanDto`, `🔒 Production Hardening`, `settlement.service.ts`, `CreatePaymentRequestDto`, `manager.controller.ts`, `public.module.ts`, `CurrentUser`, `MonetaryPolicyService`, `requireIdempotencyKey`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `ts`, `tsParser`, `name` to the rest of the system?**
  _715 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0771478667445938 - nodes in this community are weakly interconnected._
- **Should `AppShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08156028368794327 - nodes in this community are weakly interconnected._
- **Should `SmartBank Connector Service — Design Spec` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._