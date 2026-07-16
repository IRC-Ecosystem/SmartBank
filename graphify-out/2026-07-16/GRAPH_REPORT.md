# Graph Report - .  (2026-07-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 1688 nodes · 3446 edges · 138 communities (88 shown, 50 thin omitted)
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

## Communities (138 total, 50 thin omitted)

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
Cohesion: 0.18
Nodes (8): AppError, STATUS_BY_CODE, ErrorCode, IdempotencyService, Injectable, asJson(), IdempotencyInput, isDeadlock()

### Community 10 - "CreateNotificationDto"
Cohesion: 0.08
Nodes (22): CreateNotificationDto, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, ListNotificationsDto (+14 more)

### Community 11 - "dependencies"
Cohesion: 0.06
Nodes (34): bcryptjs, mysql2, dependencies, bcryptjs, cors, dotenv, express, jsonwebtoken (+26 more)

### Community 12 - "central-bank.ts"
Cohesion: 0.12
Nodes (23): metadata, DocumentKey, documents, SwaggerDocs(), auth, bodyOp(), centralBankSpec, financialAuth (+15 more)

### Community 13 - "MoneyService"
Cohesion: 0.09
Nodes (14): FeeComponent, FeeQuote, FeeQuoteService, SOURCE_FEE_BY_APP, Injectable, FeeQuoteController, Controller, asJson() (+6 more)

### Community 14 - "dependencies"
Cohesion: 0.06
Nodes (30): dependencies, lucide-react, react, react-dom, react-router-dom, typescript, vite, @vitejs/plugin-react (+22 more)

### Community 15 - "compilerOptions"
Cohesion: 0.06
Nodes (30): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+22 more)

### Community 16 - "PrismaService"
Cohesion: 0.11
Nodes (10): AuditLogService, Injectable, jsonSafe(), ManagerService, Injectable, PrismaService, Injectable, TellerService (+2 more)

### Community 17 - "SettlementService"
Cohesion: 0.34
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
Cohesion: 0.23
Nodes (11): requestHash(), requireIdempotencyKey(), Roles(), PaymentRequestsController, Body, Controller, Param, Post (+3 more)

### Community 26 - "Public"
Cohesion: 0.17
Nodes (10): Public(), ServiceTokenGuard, Injectable, HealthController, Controller, Get, HealthModule, Module (+2 more)

### Community 27 - "auth.controller.ts"
Cohesion: 0.16
Nodes (14): AuthController, Body, Controller, Post, Req, AuthService, Injectable, LoginDto (+6 more)

### Community 28 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, incremental, module (+11 more)

### Community 29 - "package.json"
Cohesion: 0.10
Nodes (19): dependencies, cors, dotenv, express, http-proxy-middleware, jsonwebtoken, description, cors (+11 more)

### Community 30 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, bcrypt, class-transformer, class-validator, jsonwebtoken, @nestjs/common, @nestjs/config, passport-jwt (+11 more)

### Community 31 - "prisma.module.ts"
Cohesion: 0.16
Nodes (11): PrismaModule, Module, PublicController, Controller, Get, PublicModule, Module, PublicStats (+3 more)

### Community 32 - "dependencies"
Cohesion: 0.11
Nodes (19): clsx, driver.js, dependencies, clsx, driver.js, geist, lucide-react, next-themes (+11 more)

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
Nodes (11): RequestUser, requestId(), TellerController, Body, Controller, Param, Post, Req (+3 more)

### Community 37 - ".parse"
Cohesion: 0.12
Nodes (7): Get, Query, Body, Post, Req, Get, Query

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
Cohesion: 0.26
Nodes (11): ManagerLoanActionDto, ManagerUserActionDto, IsNotEmpty, IsOptional, IsString, MaxLength, ManagerController, Body (+3 more)

### Community 44 - ".settleViaConnector"
Cohesion: 0.12
Nodes (13): InternalSettleDto, IsNotEmpty, IsObject, IsOptional, IsString, Matches, MaxLength, InternalSettlementController (+5 more)

### Community 45 - "server.js"
Cohesion: 0.17
Nodes (10): jwtMiddleware(), auditRequests(), createRateLimiter(), requestContext(), securityHeaders(), allowedOrigins, app, KNOWN_BAD_SECRETS (+2 more)

### Community 46 - "theme-provider.tsx"
Cohesion: 0.20
Nodes (12): metadata, applyThemeClass(), isTheme(), persistTheme(), readInitialTheme(), readSystemTheme(), ResolvedTheme, Theme (+4 more)

### Community 47 - "package.json"
Cohesion: 0.14
Nodes (13): description, jest, collectCoverageFrom, coverageDirectory, rootDir, testEnvironment, testRegex, transform (+5 more)

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
Cohesion: 0.24
Nodes (8): CurrentUser, LoansController, Body, Controller, Get, Param, Post, Req

### Community 53 - "compilerOptions"
Cohesion: 0.15
Nodes (12): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, moduleResolution, outDir, rootDir, skipLibCheck (+4 more)

### Community 54 - "teller.controller.ts"
Cohesion: 0.38
Nodes (10): KycActionDto, KycApprovalDto, KycRejectionDto, TellerActionDto, IsIn, IsNotEmpty, IsOptional, IsString (+2 more)

### Community 55 - "WalletsController"
Cohesion: 0.27
Nodes (7): InternalUsersController, Controller, Get, Param, UseGuards, UsersController, WalletsController

### Community 56 - "central-bank.controller.ts"
Cohesion: 0.47
Nodes (9): BurnDto, FeeConfigurationDto, IssuanceDto, ReversalDto, IsNotEmpty, IsOptional, IsString, Matches (+1 more)

### Community 57 - "AdminDashboard.tsx"
Cohesion: 0.24
Nodes (6): AdminDashboard(), AnimatedNumber(), AuditLog, money(), Supply, unwrap()

### Community 58 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (5): ErrorBoundary, Props, State, ErrorState(), ErrorStateProps

### Community 59 - "CentralBankController"
Cohesion: 0.36
Nodes (6): CentralBankController, Body, Controller, Post, Req, Put

### Community 60 - "FeeQuoteDto"
Cohesion: 0.20
Nodes (8): FeeQuoteDto, IsIn, IsNotEmpty, IsString, Matches, MaxLength, Body, Post

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
Nodes (7): devDependencies, eslint, @nestjs/cli, tsconfig-paths, eslint, @nestjs/cli, tsconfig-paths

### Community 71 - "ledger.service.ts"
Cohesion: 0.33
Nodes (3): LedgerPost, LedgerService, Injectable

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
Cohesion: 0.50
Nodes (4): moduleFileExtensions, ts, js, json

### Community 83 - "e2e-test.js"
Cohesion: 0.83
Nodes (3): createClient(), delay(), runE2ETests()

### Community 84 - "AdminAudit.tsx"
Cohesion: 0.67
Nodes (3): AdminAudit(), AuditLog, unwrap()

## Knowledge Gaps
- **447 isolated node(s):** `ts`, `tsParser`, `name`, `version`, `private` (+442 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CentralBankController` connect `CentralBankController` to `central-bank.controller.ts`, `requireIdempotencyKey`, `MonetaryPolicyService`, `app.module.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `PrismaService` connect `PrismaService` to `ledger.service.ts`, `settlement.service.ts`, `CreateNotificationDto`, `MoneyService`, `SettlementService`, `MonetaryPolicyService`, `prisma.module.ts`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `RequestUser` connect `RequestUser` to `.parse`, `CreateNotificationDto`, `ManagerController`, `CurrentUser`, `teller.controller.ts`, `WalletsController`, `central-bank.controller.ts`, `requireIdempotencyKey`, `Public`, `CentralBankController`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `ts`, `tsParser`, `name` to the rest of the system?**
  _447 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0771478667445938 - nodes in this community are weakly interconnected._
- **Should `AppShell.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08156028368794327 - nodes in this community are weakly interconnected._
- **Should `PaymentRequestPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12790697674418605 - nodes in this community are weakly interconnected._