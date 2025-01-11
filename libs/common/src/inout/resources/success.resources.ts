import { Resource } from '@libs/common/api';

import { SuccessContract } from '../contracts';

export class SuccessResource extends Resource<SuccessContract> {
  constructor(private item?: SuccessContract) {
    super();
  }

  result(): SuccessContract {
    return {
      success: this.item?.success || true,
    };
  }
}
