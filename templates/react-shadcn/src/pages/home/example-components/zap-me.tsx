import { useNdk } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';

import { useZapModalState } from '@/shared/hooks';

export const ZapMe = () => {
  const { openZapModal, setZapTarget } = useZapModalState();

  const { ndk } = useNdk();

  const user = ndk.getUser({
    pubkey: '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e', // Sepehr
  });

  if (!ndk) return null;

  return (
    <Button
      onClick={() => {
        setZapTarget(user);
        openZapModal();
      }}
    >
      Zap me!
    </Button>
  );
};
