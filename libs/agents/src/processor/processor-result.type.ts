import { RmqResult } from '@libs/core/rabbitmq';

export interface MakeJobResult extends RmqResult<{ content: string }> {}
