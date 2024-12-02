import { useLogin } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';

export const LogoutWidget = () => {
  const { logout } = useLogin();

  return <Button onClick={() => logout()}>Logout</Button>;
};
