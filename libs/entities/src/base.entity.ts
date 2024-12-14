export abstract class BaseEntity<T> {
  constructor(props: T) {
    Object.assign(this, props);
  }
}
