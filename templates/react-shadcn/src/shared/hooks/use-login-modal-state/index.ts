import { useStore } from '@/shared/store';

/**
 * Custom hook for managing the login modal state.
 *
 * @returns An object containing functions and state variables related to the login modal.
 */
export const useLoginModalState = () => {
  const isLoginModalOpen = useStore((state) => state.isLoginModalOpen);
  const setIsLoginModalOpen = useStore((state) => state.setIsLoginModalOpen);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  return {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    setIsLoginModalOpen,
    toggleLoginModal,
  };
};
