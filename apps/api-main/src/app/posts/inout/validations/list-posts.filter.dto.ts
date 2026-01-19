import { IsString, IsOptional } from 'class-validator';

export class ListPostsFilterDto {
  @IsString()
  @IsOptional()
  title: string;
}
