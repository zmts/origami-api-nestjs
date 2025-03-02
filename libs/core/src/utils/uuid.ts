import { v4, v7 } from 'uuid';

export function uuid7(): string {
  return v7();
}

export function uuid4(): string {
  return v4();
}
