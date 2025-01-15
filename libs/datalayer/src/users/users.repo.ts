import { Injectable } from '@nestjs/common';

import { BaseRepo } from '@libs/common/typeorm';
import { uuid } from '@libs/common/utils';
import { User } from '@libs/entities';

@Injectable()
export class UsersRepo extends BaseRepo<User> {
  protected table = 'users';

  findOneByEmail({ email }: Pick<User, 'email'>): Promise<User | null> {
    if (!email) return null;
    return this.findOne({ email });
  }

  async findOrRegister({ email, socialId, provider }: { email: string; socialId: string; provider: string }): Promise<User> {
    let user: User;

    if (email) {
      user = await this.findOne({ email });
      if (user && socialId && provider && !user.socialId) {
        user.socialId = socialId;
        user.socialProvider = provider;
        await this.save(user);
      }
    }
    if (!user) {
      user = await this.findOne({ socialId });

      if (!user) {
        user = await this.save(
          new User({
            uuid: uuid(),
            socialProvider: provider,
            socialId,
            email: email || null,
          }),
        );
      }
    }

    return user;
  }
}
