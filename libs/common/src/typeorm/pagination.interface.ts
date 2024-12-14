export function isPagination<T = any>(obj: any): obj is Pagination<T> {
  return obj && 'items' in obj && 'page' in obj && 'limit' in obj && 'total' in obj;
}

export interface Pagination<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
