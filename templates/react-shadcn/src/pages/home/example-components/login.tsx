import { useActiveUser, useLogin } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';

import { useLoginModalState } from '@/shared/hooks';

export const Login = () => {
  const { activeUser } = useActiveUser();
  const { logout } = useLogin();

  const { openLoginModal } = useLoginModalState();

  if (activeUser) {
    return <Button onClick={() => logout()}>Logout</Button>;
  } else {
    return <Button onClick={() => openLoginModal()}>Login</Button>;
  }
};
