export interface CurrentUserJwt {
  id: number;
  uuid: string;
  email: string;
}

export class CurrentUserJwt {
  constructor(item: CurrentUserJwt) {
    Object.assign(this, item);
  }

  toJSON?(): CurrentUserJwt {
    return { ...this };
  }
}
