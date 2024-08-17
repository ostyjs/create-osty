import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { create } from 'zustand';

type State = {
  isLoginModalOpen: boolean;

  isZapModalOpen: boolean;

  zapTarget: NDKEvent | NDKUser | undefined;
};

type Actions = {
  setIsLoginModalOpen: (isOpen: boolean) => void;

  setIsZapModalOpen: (isOpen: boolean) => void;

  setZapTarget: (target: NDKEvent | NDKUser | undefined) => void;
};

export const useStore = create<State & Actions>((set) => ({
  isLoginModalOpen: false,

  isZapModalOpen: false,

  zapTarget: undefined,

  setIsLoginModalOpen: (isOpen) => set({ isLoginModalOpen: isOpen }),

  setIsZapModalOpen: (isOpen) => set({ isZapModalOpen: isOpen }),

  setZapTarget: (target) => set({ zapTarget: target }),
}));
