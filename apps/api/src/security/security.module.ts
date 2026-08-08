import { Global, Module } from '@nestjs/common';
import { CredentialCipher } from './credential-cipher.js';

@Global()
@Module({ providers: [CredentialCipher], exports: [CredentialCipher] })
export class SecurityModule {}
