import { IsString } from 'class-validator';

export class ListPostsFilterDto {
  @IsString()
  title: string;
}
