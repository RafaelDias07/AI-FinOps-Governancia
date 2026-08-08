import { Controller, Get } from '@nestjs/common';

interface HealthResponse {
  status: 'ok';
  service: 'ai-finops-api';
  timestamp: string;
}

@Controller('health')
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return {
      status: 'ok',
      service: 'ai-finops-api',
      timestamp: new Date().toISOString(),
    };
  }
}
