import { Injectable } from '@nestjs/common';

import { BaseAction } from '@libs/common/api';
import { AuthResource } from '@libs/common/auth/inout';
import { GoogleAuthResult } from '@libs/units/auth-google';

@Injectable()
export class LoginGoogleAction extends BaseAction<[GoogleAuthResult], AuthResource> {
  constructor() {
    super();
  }

  async run(authResult: GoogleAuthResult): Promise<AuthResource> {
    return new AuthResource({ accessToken: authResult.profile.email, refreshToken: authResult.profile.id });
  }
}
