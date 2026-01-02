// Mock gapi globally for all tests
(window as any).gapi = {
  load: (str: string, callback: Function) => {
    callback();
  },
  auth2: {
    init: (options?: any) => {
      return {
        then: (callback: Function) => {
          callback();
          return Promise.resolve();
        }
      };
    }
  },
  client: {
    init: (options?: any) => {
      return Promise.resolve();
    }
  }
};
