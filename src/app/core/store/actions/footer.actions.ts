import { Action } from '@ngrx/store';

export namespace FooterActions {
  export const SHOW = '[Footer] Show';
  export const HIDE = '[Footer] Hide';
  export const POPUP = '[Footer] Popup';

  export class Show implements Action {
    readonly type = SHOW;
    constructor(public readonly message: string) {}
  }
  export class Hide implements Action {
    readonly type = HIDE;
  }
  export class Popup implements Action {
    readonly type = POPUP;
    constructor(
      public readonly message: string,
      public readonly delay = 2000
    ) {}
  }

  export type Types = Show | Hide | Popup;
}
