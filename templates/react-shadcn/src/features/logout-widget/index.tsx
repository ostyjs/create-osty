import { Button } from '@/shared/components/ui/button';

import { useNdk } from '@/shared/hooks';

export const LogoutWidget = () => {
  const { logout } = useNdk();

  return <Button onClick={() => logout()}>Logout</Button>;
};
