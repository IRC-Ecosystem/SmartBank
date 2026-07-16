# SmartBank Connector

This is the API Connector service for sister applications to connect to the SmartBank CBDC ecosystem.

## Stack
- Node.js 20
- Express
- Prisma
- MySQL

## Setup
1. Define environment variables (see `.env.example`).
2. Run `npm install`.
3. Run `npm run prisma:generate`.
4. Run `npm run prisma:push` to sync database schema.
5. Run `npm run dev` to start.

## Testing
Run `npm test` for smoke tests.
