import { AppError, ErrorCode } from '@libs/common/errors';
import { UserId } from '@libs/common/types/global';

export function ownerPolicy({ currentUserId, entityUserId }: { currentUserId: UserId; entityUserId: UserId }): void {
  if (currentUserId !== entityUserId) {
    throw new AppError(ErrorCode.ACCESS);
  }
}
