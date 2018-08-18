export const getError = (res: any): string => {
  switch (res && res.constructor && res.constructor.name) {
    case 'HttpErrorResponse': {
      return res.statusText;
    }
    default: {
      return 'Unknown error';
    }
  }
};
