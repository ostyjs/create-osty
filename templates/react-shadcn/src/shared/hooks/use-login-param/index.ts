import { useSearchParams } from 'react-router-dom';

// We're controlling the login modal state using the URL query params (e.g. ?login-modal=true)
// You can use `openLoginModal` wherever you want the user to login

export const useLoginParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const isLoginModalOpen = searchParams.get('login-modal') === 'true';

  const openLoginModal = () => {
    setSearchParams((params) => {
      params.set('login-modal', 'true');
      return params;
    });
  };

  const closeLoginModal = () => {
    setSearchParams((params) => {
      params.delete('login-modal');
      return params;
    });
  };

  return { isLoginModalOpen, openLoginModal, closeLoginModal };
};
