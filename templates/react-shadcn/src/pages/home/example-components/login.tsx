import { useActiveUser, useLogin } from 'nostr-hooks';
import { useEffect } from 'react';

import { Button } from '@/shared/components/ui/button';
import { useLoginParam } from '@/shared/hooks';

export const Login = () => {
  const { activeUser } = useActiveUser();
  const { openLoginModal } = useLoginParam();
  const { reLoginFromLocalStorage, logout } = useLogin();

  useEffect(() => {
    reLoginFromLocalStorage({});
  }, []);

  if (activeUser) {
    return <Button onClick={() => logout()}>Logout</Button>;
  } else {
    return <Button onClick={() => openLoginModal()}>Login</Button>;
  }
};
