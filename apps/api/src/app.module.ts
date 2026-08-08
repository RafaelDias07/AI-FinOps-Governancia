import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { apiEnvSchema } from '@finops/shared';
import { HealthModule } from './health/health.module.js';
import { SecurityModule } from './security/security.module.js';
import { SyncModule } from './sync/sync.module.js';

function redisConnection(redisUrl: string) {
  const url = new URL(redisUrl);
  return {
    host: url.hostname,
    port: Number(url.port || 6379),
    username: url.username || undefined,
    password: url.password || undefined,
    db: url.pathname.length > 1 ? Number(url.pathname.slice(1)) : 0,
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: (environment) => apiEnvSchema.parse(environment),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: redisConnection(config.getOrThrow<string>('REDIS_URL')),
      }),
    }),
    HealthModule,
    SecurityModule,
    SyncModule,
  ],
})
export class AppModule {}
