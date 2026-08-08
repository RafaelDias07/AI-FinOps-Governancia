# Security and data handling

- Credentials are encrypted before persistence with authenticated encryption. The local implementation reads a 32-byte base64 key; production should replace key storage/rotation with a KMS-backed envelope-encryption provider.
- Do not log secrets, authorization headers, prompts, responses or unredacted raw payloads.
- Enforce organization membership and role authorization at every API boundary.
- Store source identifiers for idempotency and maintain audit logs for security-relevant mutations.
- Define raw payload retention and deletion jobs before enabling production ingestion.
