import { describe, expect, it } from 'vitest';
import { can } from './index.js';

describe('role capabilities', () => {
  it('allows owners to manage the organization', () => {
    expect(can('OWNER', 'organization:manage')).toBe(true);
  });

  it('keeps viewer access read-only', () => {
    expect(can('VIEWER', 'cost:read')).toBe(true);
    expect(can('VIEWER', 'provider:manage')).toBe(false);
  });
});
