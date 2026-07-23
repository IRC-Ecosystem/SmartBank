# Graph Report - Central-Bank  (2026-07-23)

## Corpus Check
- 183 files · ~37,390 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1034 nodes · 2476 edges · 68 communities (43 shown, 25 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4e2412ea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.module.ts
- MoneyService
- PrismaService
- types.ts
- dependencies
- AlgorithmsController
- Public
- notification.controller.ts
- WalletAccountService
- dependencies
- scripts
- PaymentRequestPage.tsx
- CurrentUser
- MonetaryPolicyService
- compilerOptions
- main.ts
- WalletOverviewPage.tsx
- compilerOptions
- Central Bank Core CBDC Simulation
- requestId
- internal-settlement.controller.ts
- CreatePaymentRequestDto
- ManagerController
- Button.tsx
- exclude
- LoginPage.tsx
- App.tsx
- DataTable.tsx
- teller.controller.ts
- requestHash
- central-bank.controller.ts
- ErrorBoundary.tsx
- api.ts
- AmountInput.tsx
- ApplyLoanDto
- devDependencies
- types.ts
- PageHeader.tsx
- TransferDto
- nest-cli.json
- eslint.config.js
- eslint-plugin-import
- jest
- jest.config.ts
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
- tsconfig-paths
- @types/bcrypt
- @types/express
- @types/jest
- @types/node
- @types/passport-jwt
- @types/swagger-ui-express
- @types/uuid
- typescript
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser

## God Nodes (most connected - your core abstractions)
1. `PrismaService` - 52 edges
2. `SettlementService` - 41 edges
3. `RequestUser` - 37 edges
4. `CurrentUser` - 37 edges
5. `MoneyService` - 36 edges
6. `requestId()` - 30 edges
7. `WalletAccountService` - 25 edges
8. `ErrorCode` - 24 edges
9. `requireIdempotencyKey()` - 23 edges
10. `useToast()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `seedLoanPoolFunding()` --references--> `@prisma/client`  [EXTRACTED]
  prisma/seed.ts → package.json
- `InboxPage()` --references--> `NotificationsApi`  [EXTRACTED]
  frontend/src/features/inbox/InboxPage.tsx → frontend/src/api/notifications.api.ts
- `DashboardPage()` --calls--> `useAuth()`  [EXTRACTED]
  frontend/src/features/dashboard/DashboardPage.tsx → frontend/src/auth/AuthProvider.tsx
- `LoginPage()` --calls--> `useToast()`  [EXTRACTED]
  frontend/src/features/auth/LoginPage.tsx → frontend/src/components/feedback/ToastProvider.tsx
- `RegisterPage()` --calls--> `useToast()`  [EXTRACTED]
  frontend/src/features/auth/RegisterPage.tsx → frontend/src/components/feedback/ToastProvider.tsx

## Import Cycles
- None detected.

## Communities (68 total, 25 thin omitted)

### Community 0 - "app.module.ts"
Cohesion: 0.06
Nodes (45): Global, OptionalAuthGuard, Injectable, RolesGuard, Injectable, ServiceTokenGuard, Injectable, AuditModule (+37 more)

### Community 1 - "MoneyService"
Cohesion: 0.07
Nodes (27): generateAccountNumber(), isValidAccountNumber(), luhnChecksum(), AppError, STATUS_BY_CODE, ErrorCode, AuditLogService, Injectable (+19 more)

### Community 2 - "PrismaService"
Cohesion: 0.08
Nodes (18): jsonSafe(), normalizeIndonesianPhone(), asJson(), Get, Query, ManagerService, Injectable, asJson() (+10 more)

### Community 3 - "types.ts"
Cohesion: 0.06
Nodes (47): RegisterPayload, ApiError, apiRequest(), client, RequestOptions, FeesApi, Notification, NotificationsApi (+39 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (46): bcrypt, class-transformer, class-validator, express-rate-limit, helmet, jsonwebtoken, @nestjs/common, @nestjs/config (+38 more)

### Community 5 - "AlgorithmsController"
Cohesion: 0.11
Nodes (15): AlgorithmsController, Body, Controller, Get, Post, AlgorithmsModule, Module, BfsService (+7 more)

### Community 6 - "Public"
Cohesion: 0.07
Nodes (30): IsEmail, MinLength, Public(), AuthController, Body, Controller, Post, Req (+22 more)

### Community 7 - "notification.controller.ts"
Cohesion: 0.08
Nodes (22): Patch, CreateNotificationDto, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength (+14 more)

### Community 8 - "WalletAccountService"
Cohesion: 0.09
Nodes (14): normalizeIndonesianPhone(), Injectable, UPGRADEABLE_ROLES, WalletAccountService, InternalUsersController, Body, Controller, Get (+6 more)

### Community 9 - "dependencies"
Cohesion: 0.06
Nodes (30): dependencies, lucide-react, react, react-dom, react-router-dom, typescript, vite, @vitejs/plugin-react (+22 more)

### Community 10 - "scripts"
Cohesion: 0.06
Nodes (30): description, jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex (+22 more)

### Community 11 - "PaymentRequestPage.tsx"
Cohesion: 0.23
Nodes (17): CentralBankApi, PaymentApi, AmountInput, Card(), CardContent(), CardDescription(), CardHeader(), CardProps (+9 more)

### Community 12 - "CurrentUser"
Cohesion: 0.20
Nodes (15): CurrentUser, RequestUser, LoansController, Body, Controller, Get, Param, Post (+7 more)

### Community 13 - "MonetaryPolicyService"
Cohesion: 0.12
Nodes (5): Get, Param, Query, MonetaryPolicyService, Injectable

### Community 14 - "compilerOptions"
Cohesion: 0.09
Nodes (22): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+14 more)

### Community 15 - "main.ts"
Cohesion: 0.17
Nodes (16): Catch, AppModule, Module, ApiResponseInterceptor, normalize(), Injectable, HttpErrorFilter, auditRequests() (+8 more)

### Community 16 - "WalletOverviewPage.tsx"
Cohesion: 0.25
Nodes (13): LedgerApi, SupplyApi, WalletApi, useToast(), PageHeader(), Badge(), BadgeProps, DashboardPage() (+5 more)

### Community 17 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, incremental, module (+11 more)

### Community 18 - "Central Bank Core CBDC Simulation"
Cohesion: 0.11
Nodes (18): Architecture, Central Bank Core CBDC Simulation, Common Commands, Database Schema, Docker / Production (in-container), Endpoints, Financial Invariants, Frontend Test Client (+10 more)

### Community 19 - "requestId"
Cohesion: 0.26
Nodes (10): requestId(), requireIdempotencyKey(), Roles(), PaymentRequestsController, Controller, TransfersController, Body, Controller (+2 more)

### Community 20 - "internal-settlement.controller.ts"
Cohesion: 0.13
Nodes (13): InternalSettleDto, IsNotEmpty, IsObject, IsOptional, IsString, Matches, MaxLength, InternalSettlementController (+5 more)

### Community 21 - "CreatePaymentRequestDto"
Cohesion: 0.13
Nodes (13): IsDateString, CreatePaymentRequestDto, IsIn, IsNotEmpty, IsObject, IsOptional, IsString, Matches (+5 more)

### Community 22 - "ManagerController"
Cohesion: 0.26
Nodes (11): ManagerLoanActionDto, ManagerUserActionDto, IsNotEmpty, IsOptional, IsString, MaxLength, ManagerController, Body (+3 more)

### Community 23 - "Button.tsx"
Cohesion: 0.19
Nodes (7): PaginationProps, Button, ButtonProps, CopyButtonProps, ModalProps, formatCountdown(), InboxPage()

### Community 24 - "exclude"
Cohesion: 0.14
Nodes (13): **/*spec.ts, src/**/*.ts, test, ./tsconfig.json, compilerOptions, outDir, rootDir, exclude (+5 more)

### Community 25 - "LoginPage.tsx"
Cohesion: 0.31
Nodes (9): AuthApi, LoansApi, schemas, setSessionToken(), LoginPage(), RegisterPage(), LoanPage(), getErrorMessage() (+1 more)

### Community 26 - "App.tsx"
Cohesion: 0.19
Nodes (9): TransferApi, App(), ResponseConsole(), Toast, ToastContext, ToastContextType, ToastProvider(), ToastType (+1 more)

### Community 27 - "DataTable.tsx"
Cohesion: 0.21
Nodes (8): ColumnDef, DataTable(), DataTableProps, EmptyState(), EmptyStateProps, Skeleton(), SkeletonProps, AuditLogPage()

### Community 28 - "teller.controller.ts"
Cohesion: 0.38
Nodes (10): KycActionDto, KycApprovalDto, KycRejectionDto, TellerActionDto, IsIn, IsNotEmpty, IsOptional, IsString (+2 more)

### Community 29 - "requestHash"
Cohesion: 0.35
Nodes (7): Put, requestHash(), CentralBankController, Body, Controller, Post, Req

### Community 30 - "central-bank.controller.ts"
Cohesion: 0.47
Nodes (9): BurnDto, FeeConfigurationDto, IssuanceDto, ReversalDto, IsNotEmpty, IsOptional, IsString, Matches (+1 more)

### Community 31 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (5): ErrorBoundary, Props, State, ErrorState(), ErrorStateProps

### Community 32 - "api.ts"
Cohesion: 0.28
Nodes (5): apiBaseUrl(), ApiEnvelope, apiRequest(), ApiResult, newRequestId()

### Community 33 - "AmountInput.tsx"
Cohesion: 0.39
Nodes (5): AmountInputProps, InputProps, CONSTANTS, ROLES, parseMoneyInput()

### Community 34 - "ApplyLoanDto"
Cohesion: 0.39
Nodes (7): ApplyLoanDto, RepayLoanDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength

### Community 35 - "devDependencies"
Cohesion: 0.29
Nodes (7): eslint, eslint-config-prettier, devDependencies, eslint, eslint-config-prettier, @types/jsonwebtoken, @types/jsonwebtoken

### Community 36 - "types.ts"
Cohesion: 0.29
Nodes (6): FeeQuote, LogEntry, PanelKey, SupplyReport, WalletBalance, WalletTransaction

### Community 37 - "PageHeader.tsx"
Cohesion: 0.53
Nodes (4): Breadcrumb(), BreadcrumbItem, BreadcrumbProps, PageHeaderProps

### Community 38 - "TransferDto"
Cohesion: 0.33
Nodes (6): TransferDto, IsNotEmpty, IsOptional, IsString, Matches, MaxLength

### Community 39 - "nest-cli.json"
Cohesion: 0.50
Nodes (3): collection, $schema, sourceRoot

## Knowledge Gaps
- **202 isolated node(s):** `ts`, `tsParser`, `name`, `version`, `private` (+197 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MoneyService` connect `MoneyService` to `app.module.ts`, `PrismaService`, `WalletAccountService`, `CurrentUser`, `MonetaryPolicyService`, `requestId`, `teller.controller.ts`, `central-bank.controller.ts`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `upsertFeeRules()` connect `dependencies` to `PrismaService`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **What connects `ts`, `tsParser`, `name` to the rest of the system?**
  _202 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.module.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.059125085440874914 - nodes in this community are weakly interconnected._
- **Should `MoneyService` be split into smaller, more focused modules?**
  _Cohesion score 0.07347915242652085 - nodes in this community are weakly interconnected._
- **Should `PrismaService` be split into smaller, more focused modules?**
  _Cohesion score 0.08324324324324324 - nodes in this community are weakly interconnected._