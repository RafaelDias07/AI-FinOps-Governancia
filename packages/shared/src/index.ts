import { z } from 'zod';

export const providers = ['OPENAI', 'ANTHROPIC', 'VERTEX_AI'] as const;
export type Provider = (typeof providers)[number];

export const organizationRoles = ['OWNER', 'ADMIN', 'FINOPS', 'VIEWER'] as const;
export type OrganizationRole = (typeof organizationRoles)[number];

export const capabilities = [
  'organization:manage',
  'provider:manage',
  'sync:run',
  'cost:read',
  'usage:read',
  'license:manage',
  'recommendation:manage',
] as const;
export type Capability = (typeof capabilities)[number];

const roleCapabilities: Record<OrganizationRole, ReadonlySet<Capability>> = {
  OWNER: new Set(capabilities),
  ADMIN: new Set(capabilities.filter((capability) => capability !== 'organization:manage')),
  FINOPS: new Set([
    'sync:run',
    'cost:read',
    'usage:read',
    'license:manage',
    'recommendation:manage',
  ]),
  VIEWER: new Set(['cost:read', 'usage:read']),
};

export function can(role: OrganizationRole, capability: Capability): boolean {
  return roleCapabilities[role].has(capability);
}

export const apiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().url().or(z.string().startsWith('postgresql://')),
  REDIS_URL: z.string().url(),
  WEB_ORIGIN: z.string().url().default('http://localhost:3000'),
  CREDENTIAL_ENCRYPTION_KEY: z.string().min(1),
});

export type ApiEnvironment = z.infer<typeof apiEnvSchema>;

export interface DateRange {
  from: Date;
  to: Date;
}

export interface UsageMetric {
  organizationId: string;
  provider: Provider;
  sourceId: string;
  occurredAt: Date;
  projectExternalId: string;
  model: string;
  inputTokens: bigint;
  outputTokens: bigint;
  requests: number;
  apiKeyExternalId?: string;
  raw: Record<string, unknown>;
}

export interface CostMetric {
  organizationId: string;
  provider: Provider;
  sourceId: string;
  occurredAt: Date;
  projectExternalId: string;
  amountMicros: bigint;
  currency: string;
  category: string;
  raw: Record<string, unknown>;
}

export interface Page<T> {
  items: T[];
  nextCursor?: string;
}

export const healthResponseSchema = z.object({
  status: z.literal('ok'),
  service: z.literal('ai-finops-api'),
  timestamp: z.string().datetime(),
});
