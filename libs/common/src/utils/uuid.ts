import { v4, v7 } from 'uuid';

export function uuid(): string {
  return v7();
}

export function uuidRandom(): string {
  return v4();
}
