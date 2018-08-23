import { PouchActions } from '@app/auth/store/actions';

export interface State {
  // docs: {
  //   [key: string]: any;
  // };
  docs: any[];
}

export const INITIAL_STATE: State = {
  // docs: {}
  docs: []
};

export function reducer(
  state = INITIAL_STATE,
  action: PouchActions.Types
): State {
  switch (action.type) {
    case PouchActions.DOCS: {
      // return {
      //   ...state,
      //   docs: action.docs.reduce((acc, cur) => {
      //     return {
      //       ...acc,
      //       [cur._id]: cur
      //     };
      //   }, {})
      // };
      return {
        ...state,
        docs: action.docs.slice()
      };
    }

    default: {
      return state;
    }
  }
}

export const getDocs = (state: State) => state.docs;
