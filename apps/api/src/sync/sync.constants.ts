export const PROVIDER_SYNC_QUEUE = 'provider-sync';

export interface ProviderSyncPayload {
  organizationId: string;
  providerAccountId: string;
  syncJobId: string;
  kind: 'inventory' | 'usage' | 'costs';
}
