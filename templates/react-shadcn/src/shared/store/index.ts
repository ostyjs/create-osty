import { create } from 'zustand';

/**
 * This is a sample store that you can use to manage your global state.
 * Read more about Zustand here: https://github.com/pmndrs/zustand
 */

type State = {
  sample: string | undefined;
};

type Actions = {
  setSample: (sample: string) => void;
};

export const useStore = create<State & Actions>((set) => ({
  sample: undefined,

  setSample: (sample) => set({ sample }),
}));
