// useModal.js (Custom Hook)
import { useState } from 'react';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  return {
    isVisible,
    showModal,
    hideModal
  };
};
