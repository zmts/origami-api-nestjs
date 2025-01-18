import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, CurrentUserJwt, JwtGuard } from '@libs/units/auth';

import { GetPostAction, CreatePostAction } from './actions';
import { PostResource } from './inout/resources';
import { CreatePostDto } from './inout/validations';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private getPostAction: GetPostAction,
    private createPostAction: CreatePostAction,
  ) {}

  @Get(':uuid')
  getPostByUuid(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<PostResource> {
    return this.getPostAction.run(uuid);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto, @CurrentUser() currentUserJwt: CurrentUserJwt): Promise<PostResource> {
    return this.createPostAction.run(dto, currentUserJwt);
  }
}
