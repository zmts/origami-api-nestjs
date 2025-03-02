import { UserId } from '@libs/common/types/global';
import { AppError, ErrorCode } from '@libs/core/errors';

export function ownerPolicy({ currentUserId, entityUserId }: { currentUserId: UserId; entityUserId: UserId }): void {
  if (currentUserId !== entityUserId) {
    throw new AppError(ErrorCode.ACCESS);
  }
}
