import { IsUUID } from 'class-validator';

export class MakeJobPayload {
  @IsUUID()
  id: string;
}
