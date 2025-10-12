// Extend window object for Zustand state
interface Window {
  __ZUSTAND_STATE__?: {
    [key: string]: {
      state: any;
    };
  };
}