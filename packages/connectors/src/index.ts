import type { CostMetric, DateRange, Page, Provider, UsageMetric } from '@finops/shared';

export interface ConnectorContext {
  organizationId: string;
  accountExternalId: string;
  credential: string;
}

export interface ListOptions {
  range: DateRange;
  cursor?: string;
  limit: number;
}

export interface ProviderProject {
  externalId: string;
  name: string;
  metadata: Record<string, unknown>;
}

export interface ProviderApiKey {
  externalId: string;
  projectExternalId?: string;
  name: string;
  ownerEmail?: string;
  status: 'active' | 'inactive' | 'unknown';
  metadata: Record<string, unknown>;
}

export interface AiProviderConnector {
  readonly provider: Provider;
  listProjects(context: ConnectorContext): Promise<ProviderProject[]>;
  listApiKeys(context: ConnectorContext): Promise<ProviderApiKey[]>;
  listUsage(context: ConnectorContext, options: ListOptions): Promise<Page<UsageMetric>>;
  listCosts(context: ConnectorContext, options: ListOptions): Promise<Page<CostMetric>>;
}

abstract class UnconfiguredConnector implements AiProviderConnector {
  abstract readonly provider: Provider;

  protected unavailable(): never {
    throw new Error(`${this.provider} connector is not configured`);
  }

  async listProjects(_context: ConnectorContext): Promise<ProviderProject[]> {
    return this.unavailable();
  }

  async listApiKeys(_context: ConnectorContext): Promise<ProviderApiKey[]> {
    return this.unavailable();
  }

  async listUsage(_context: ConnectorContext, _options: ListOptions): Promise<Page<UsageMetric>> {
    return this.unavailable();
  }

  async listCosts(_context: ConnectorContext, _options: ListOptions): Promise<Page<CostMetric>> {
    return this.unavailable();
  }
}

export class OpenAiConnector extends UnconfiguredConnector {
  readonly provider = 'OPENAI' as const;
}

export class AnthropicConnector extends UnconfiguredConnector {
  readonly provider = 'ANTHROPIC' as const;
}

export class VertexAiConnector extends UnconfiguredConnector {
  readonly provider = 'VERTEX_AI' as const;
}

export class ConnectorRegistry {
  private readonly connectors = new Map<Provider, AiProviderConnector>();

  constructor(connectors: AiProviderConnector[]) {
    for (const connector of connectors) this.connectors.set(connector.provider, connector);
  }

  get(provider: Provider): AiProviderConnector {
    const connector = this.connectors.get(provider);
    if (!connector) throw new Error(`No connector registered for ${provider}`);
    return connector;
  }
}

const sensitiveKeys = new Set([
  'authorization',
  'api_key',
  'apikey',
  'credential',
  'prompt',
  'request_body',
  'response',
  'secret',
  'token',
]);

export function redactRawPayload(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactRawPayload);
  if (value === null || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      sensitiveKeys.has(key.toLowerCase()) ? '[REDACTED]' : redactRawPayload(nestedValue),
    ]),
  );
}
