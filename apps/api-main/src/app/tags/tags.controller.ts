import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, CurrentUserJwt, JwtGuard } from '@libs/units/auth';

import { AttachTagAction, DetachTagAction } from './actions';
import { TagResource } from './inout/resources';
import { AttachTagDto, DetachTagDto } from './inout/validations';

@UseGuards(JwtGuard)
@Controller('tags')
export class TagsController {
  constructor(
    private attachTagAction: AttachTagAction,
    private detachTagAction: DetachTagAction,
  ) {}

  @Post('attach')
  async attachTag(@Body() dto: AttachTagDto, @CurrentUser() currentUserJwt: CurrentUserJwt): Promise<TagResource> {
    return this.attachTagAction.run(dto, currentUserJwt);
  }

  @Post('detach')
  async detachTag(@Body() dto: DetachTagDto, @CurrentUser() currentUserJwt: CurrentUserJwt): Promise<TagResource> {
    return this.detachTagAction.run(dto, currentUserJwt);
  }
}
