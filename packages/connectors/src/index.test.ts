import { describe, expect, it } from 'vitest';
import { ConnectorRegistry, OpenAiConnector, redactRawPayload } from './index.js';

describe('ConnectorRegistry', () => {
  it('resolves a registered provider', () => {
    expect(new ConnectorRegistry([new OpenAiConnector()]).get('OPENAI')).toBeInstanceOf(
      OpenAiConnector,
    );
  });

  it('fails closed for an unavailable provider', () => {
    expect(() => new ConnectorRegistry([]).get('ANTHROPIC')).toThrow(/No connector/);
  });
});

describe('redactRawPayload', () => {
  it('removes nested secrets and prompt content', () => {
    expect(
      redactRawPayload({ id: 'usage-1', nested: { api_key: 'sk-secret', prompt: 'private' } }),
    ).toEqual({
      id: 'usage-1',
      nested: { api_key: '[REDACTED]', prompt: '[REDACTED]' },
    });
  });
});
