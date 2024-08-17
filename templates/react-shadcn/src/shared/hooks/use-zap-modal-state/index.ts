import { useStore } from '@/shared/store';

/**
 * Custom hook for managing the zap modal state.
 *
 * @returns An object containing functions and state variables related to the zap modal.
 */
export const useZapModalState = () => {
  const isZapModalOpen = useStore((state) => state.isZapModalOpen);
  const setIsZapModalOpen = useStore((state) => state.setIsZapModalOpen);
  const zapTarget = useStore((state) => state.zapTarget);
  const setZapTarget = useStore((state) => state.setZapTarget);

  const openZapModal = () => {
    setIsZapModalOpen(true);
  };

  const closeZapModal = () => {
    setIsZapModalOpen(false);
    setZapTarget(undefined);
  };

  const toggleZapModal = () => {
    if (isZapModalOpen) {
      setZapTarget(undefined);
      setIsZapModalOpen(false);
    } else {
      setIsZapModalOpen(true);
    }
  };

  return {
    isZapModalOpen,
    openZapModal,
    closeZapModal,
    setIsZapModalOpen,
    toggleZapModal,
    zapTarget,
    setZapTarget,
  };
};
