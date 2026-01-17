import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';

import { CurrentUser, CurrentUserJwt, JwtGuard } from '@libs/common/auth';

import { GetPostAction, CreatePostAction, ListPostsAction } from './actions';
import { PostResource } from './inout/resources';
import { CreatePostDto, ListPostsFilterDto } from './inout/validations';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private getPostAction: GetPostAction,
    private createPostAction: CreatePostAction,
    private listPostsAction: ListPostsAction,
  ) {}

  @Get()
  listPosts(@Query() filter: ListPostsFilterDto): Promise<PostResource[]> {
    return this.listPostsAction.run(filter);
  }

  @Get(':uuid')
  getPostByUuid(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<PostResource> {
    return this.getPostAction.run(uuid);
  }

  @Post()
  createPost(@Body() dto: CreatePostDto, @CurrentUser() currentUserJwt: CurrentUserJwt): Promise<PostResource> {
    return this.createPostAction.run(dto, currentUserJwt);
  }
}
