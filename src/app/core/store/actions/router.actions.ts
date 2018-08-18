import { Action } from '@ngrx/store';

export namespace RouterActions {
  export const NAVIGATE = '[Router] Navigate';

  export class Navigate implements Action {
    readonly type = NAVIGATE;
    constructor(public readonly paths: string[]) {}
  }

  export type Types = Navigate;
}
