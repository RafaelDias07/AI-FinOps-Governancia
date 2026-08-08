# Architecture

The system is an npm-workspace TypeScript monorepo. Next.js provides the application shell; NestJS owns API, tenant authorization, audit events and background-work submission. PostgreSQL persists normalized records through Prisma and Redis/BullMQ executes provider synchronizations.

Provider connectors normalize data into a provider-agnostic contract before API services persist it. Adapters are intentionally credential-free stubs until a provider-specific integration can implement authenticated retrieval, cursor pagination, rate-limit backoff, idempotency and redaction.

```text
Web -> API (tenant/RBAC boundary) -> PostgreSQL
                                -> Redis/BullMQ -> Connector -> Provider API
```

Every tenant record belongs to an organization. Cross-tenant access must be structurally impossible in service queries, not merely hidden in the UI. Provider raw payloads are JSON snapshots for traceability and require redaction plus a retention policy before production collection.
