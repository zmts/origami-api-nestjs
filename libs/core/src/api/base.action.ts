export abstract class BaseAction<T extends Array<unknown>, R> {
  abstract run(...args: T): Promise<R>;
}
