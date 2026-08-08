import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PROVIDER_SYNC_QUEUE } from './sync.constants.js';
import { SyncQueueService } from './sync-queue.service.js';
import { ProviderSyncProcessor } from './sync.processor.js';

@Module({
  imports: [BullModule.registerQueue({ name: PROVIDER_SYNC_QUEUE })],
  providers: [SyncQueueService, ProviderSyncProcessor],
  exports: [SyncQueueService],
})
export class SyncModule {}
