import { IApiPaginationResponse, ApiResponse } from './api-response';
import { ResourceList } from './resource-list';

export abstract class Resource<Contract = any> {
  abstract result(): Contract;

  protected setResult<Contract>(item: any, contract: new () => Contract): Contract {
    const contractResult = new contract();
    for (const key in contractResult) {
      contractResult[key] = item[key];
    }
    return contractResult;
  }

  static list<Contract>(
    items: Contract[],
    options?: { pagination?: IApiPaginationResponse; meta?: { [key: string]: any } },
  ): ResourceList<Contract> {
    return new ResourceList<Contract>(this as any, items, options);
  }

  toResponse(): ApiResponse<Contract> {
    return new ApiResponse(this.result());
  }
}
