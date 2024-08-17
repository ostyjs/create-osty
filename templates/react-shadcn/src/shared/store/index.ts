import { create } from 'zustand';

type State = {
  isLoginModalOpen: boolean;

  isZapModalOpen: boolean;
};

type Actions = {
  setIsLoginModalOpen: (isOpen: boolean) => void;

  setIsZapModalOpen: (isOpen: boolean) => void;
};

export const useStore = create<State & Actions>((set) => ({
  isLoginModalOpen: false,

  isZapModalOpen: false,

  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),

  setIsZapModalOpen: (isOpen) => set({ isZapModalOpen: isOpen }),
}));
