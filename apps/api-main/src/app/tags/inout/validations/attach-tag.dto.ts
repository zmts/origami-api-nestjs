import { Transform } from 'class-transformer';
import { IsAlphanumeric, IsString, IsUUID, Length } from 'class-validator';

export class AttachTagDto {
  @IsString()
  @Length(2, 20)
  @IsAlphanumeric()
  @Transform(({ value }) => value?.toLowerCase())
  slug: string;

  @IsUUID()
  postUuid: string;
}
