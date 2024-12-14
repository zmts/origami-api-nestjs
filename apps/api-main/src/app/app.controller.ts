import { Controller, Get } from '@nestjs/common';

import { Resource } from '@libs/common/api';

class HealthInfoContract {
  // serverTimeAlive: string,
  // serverStartDate: string,
  nodeVersion: string;
}

class HealthInfoResource extends Resource<HealthInfoContract> {
  constructor(private readonly item: HealthInfoContract) {
    super();
  }

  result(): HealthInfoContract {
    return {
      ...this.setResult<HealthInfoContract>(this.item, HealthInfoContract),
    };
  }
}

@Controller()
export class AppController {
  @Get()
  healthInfo(): HealthInfoResource {
    return new HealthInfoResource({
      nodeVersion: process.version,
    });
  }
}
