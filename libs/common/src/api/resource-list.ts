import { ApiResponse } from './api-response';
import { Resource } from './resource';
import { IPaginationResponse } from './types';

export class ResourceList<Contract> {
  private readonly list: any[];
  private readonly pagination: IPaginationResponse;
  private readonly meta: any;

  constructor(
    private resource: new (item: any) => Resource<Contract>,
    list: Array<any>,
    options?: { pagination?: IPaginationResponse; meta?: { [key: string]: any } },
  ) {
    this.list = list;
    this.pagination = options.pagination;
    this.meta = options.meta;
  }

  result(): Contract[] {
    return this.list.map(item => new this.resource(item).result());
  }

  toResponse(): ApiResponse {
    return new ApiResponse(this.result(), { pagination: this.pagination, meta: this.meta });
  }
}
