import { ConfigService } from '@nestjs/config';
import { describe, expect, it } from 'vitest';
import { CredentialCipher } from './credential-cipher.js';

describe('CredentialCipher', () => {
  const config = new ConfigService({
    CREDENTIAL_ENCRYPTION_KEY: Buffer.alloc(32, 7).toString('base64'),
  });
  const cipher = new CredentialCipher(config);

  it('round-trips without exposing plaintext', () => {
    const encrypted = cipher.encrypt('provider-secret');
    expect(encrypted).not.toContain('provider-secret');
    expect(cipher.decrypt(encrypted)).toBe('provider-secret');
  });

  it('rejects a tampered envelope', () => {
    const encrypted = cipher.encrypt('provider-secret');
    const parts = encrypted.split('.');
    parts[2] = `${parts[2]?.startsWith('A') ? 'B' : 'A'}${parts[2]?.slice(1) ?? ''}`;
    expect(() => cipher.decrypt(parts.join('.'))).toThrow();
  });
});
