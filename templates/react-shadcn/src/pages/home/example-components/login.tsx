import { Button } from '@/shared/components/ui/button';

import { useLoginParam } from '@/shared/hooks';

export const Login = () => {
  const { openLoginModal } = useLoginParam();

  return <Button onClick={() => openLoginModal()}>Login</Button>;
};
