import { Processor, WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
import { PROVIDER_SYNC_QUEUE, type ProviderSyncPayload } from './sync.constants.js';

@Processor(PROVIDER_SYNC_QUEUE)
export class ProviderSyncProcessor extends WorkerHost {
  async process(job: Job<ProviderSyncPayload>): Promise<void> {
    // Provider calls remain disabled until credentials and production-safe adapters are configured.
    throw new Error(`Sync adapter not configured for job ${job.id ?? 'unknown'}`);
  }
}
