import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

@Injectable()
export class CredentialCipher {
  constructor(private readonly config: ConfigService) {}

  encrypt(plaintext: string): string {
    const key = this.key();
    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return [
      'v1',
      iv.toString('base64url'),
      tag.toString('base64url'),
      encrypted.toString('base64url'),
    ].join('.');
  }

  decrypt(envelope: string): string {
    const [version, iv, tag, encrypted] = envelope.split('.');
    if (version !== 'v1' || !iv || !tag || !encrypted)
      throw new Error('Invalid credential envelope');

    const decipher = createDecipheriv(ALGORITHM, this.key(), Buffer.from(iv, 'base64url'));
    decipher.setAuthTag(Buffer.from(tag, 'base64url'));
    return Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'base64url')),
      decipher.final(),
    ]).toString('utf8');
  }

  private key(): Buffer {
    const key = Buffer.from(this.config.getOrThrow<string>('CREDENTIAL_ENCRYPTION_KEY'), 'base64');
    if (key.length !== 32) throw new Error('CREDENTIAL_ENCRYPTION_KEY must decode to 32 bytes');
    return key;
  }
}
