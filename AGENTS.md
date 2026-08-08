# AI FinOps + Governança: contributor guide

## Architecture

- `apps/web`: Next.js operational dashboard.
- `apps/api`: NestJS API, authorization boundary and async sync orchestration.
- `packages/database`: Prisma schema and database client.
- `packages/connectors`: provider-neutral interfaces and provider adapters.
- `packages/shared`: contracts, shared types and domain constants.

## Rules

- Keep all tenant-owned reads and writes scoped by `organizationId`.
- Never store prompts, completion content, or provider secrets in logs or raw payloads.
- Credentials must enter the API through the encryption abstraction; plaintext persistence is prohibited.
- Make synchronizations idempotent using the provider source ID plus organization/provider context.
- Preserve raw provider payloads only when they have passed redaction and retention rules.
- TypeScript is strict. Prefer small composable services and validated DTOs.
- Do not add real provider calls unless authentication, pagination, retry and rate-limit behavior are implemented and tested.

## Commands

`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, and `npm run format:check` are the baseline checks.
