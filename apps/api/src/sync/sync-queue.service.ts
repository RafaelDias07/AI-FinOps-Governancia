import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import type { JobsOptions, Queue } from 'bullmq';
import { PROVIDER_SYNC_QUEUE, type ProviderSyncPayload } from './sync.constants.js';

const defaultJobOptions: JobsOptions = {
  attempts: 5,
  backoff: { type: 'exponential', delay: 2_000 },
  removeOnComplete: 500,
  removeOnFail: 1_000,
};

@Injectable()
export class SyncQueueService {
  constructor(@InjectQueue(PROVIDER_SYNC_QUEUE) private readonly queue: Queue) {}

  async enqueue(payload: ProviderSyncPayload): Promise<string> {
    const jobId = `${payload.organizationId}:${payload.providerAccountId}:${payload.kind}:${payload.syncJobId}`;
    const job = await this.queue.add(payload.kind, payload, { ...defaultJobOptions, jobId });
    return job.id ?? jobId;
  }
}
