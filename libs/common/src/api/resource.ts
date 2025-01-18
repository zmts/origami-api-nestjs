import { ApiResponse } from './api-response';
import { ResourceList } from './resource-list';
import { IResponseOptions } from './types';

export abstract class Resource<Contract = any> {
  abstract result(): Contract;
  options?(): IResponseOptions;

  protected setResult<Contract>(item: any, contract: new () => Contract): Contract {
    if (!item) return null;

    const contractResult = new contract();
    for (const key in contractResult) {
      contractResult[key] = item && item[key] ? item[key] : null;
    }
    return contractResult;
  }

  static list<Contract>(items: Contract[], options?: IResponseOptions): ResourceList<Contract> {
    return new ResourceList<Contract>(this as any, items, options);
  }

  toResponse(): ApiResponse<Contract> {
    return new ApiResponse(this.result(), this.options ? this.options() : {});
  }
}
