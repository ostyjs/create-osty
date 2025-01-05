import { LnPayCb, NDKEvent, NDKUser, NDKZapper } from '@nostr-dev-kit/ndk';
import { useNdk, useRealtimeProfile } from 'nostr-hooks';
import { useCallback, useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';

import { ZAP_AMOUNTS } from '../config';
import { payInvoiceByWebln } from '../utils';

export const useZapWidget = (target: NDKEvent | NDKUser | undefined) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(ZAP_AMOUNTS[0]);
  const [comment, setComment] = useState('');
  const [processing, setProcessing] = useState(false);

  const { toast } = useToast();

  const { ndk } = useNdk();

  const { profile } = useRealtimeProfile(target?.pubkey);

  const process = useCallback(() => {
    if (!target || !ndk) return;

    setProcessing(true);

    if (!ndk.signer) {
      toast({ description: 'You need to login first!' });
      setProcessing(false);
      return;
    }

    const lnPay: LnPayCb = async ({ pr }) => {
      try {
        const res = await payInvoiceByWebln(pr);

        if (res) {
          toast({ title: 'Successful ⚡️⚡️⚡️' });
          setIsModalOpen(false);
        } else {
          toast({ title: 'Failed', variant: 'destructive' });
        }

        return res;
      } catch (_) {}

      setProcessing(false);
    };

    const zapper = new NDKZapper(
      new NDKUser({ pubkey: target.pubkey }),
      selectedAmount.amount * 1000,
      'msat',
      {
        comment,
        ndk,
        lnPay,
        tags: target instanceof NDKEvent ? [['e', target.id]] : undefined,
      },
    );

    zapper.zap();
  }, [target, ndk, selectedAmount, comment, toast, setIsModalOpen, setProcessing]);

  return {
    selectedAmount,
    setSelectedAmount,
    comment,
    setComment,
    processing,
    process,
    isModalOpen,
    setIsModalOpen,
    displayName: profile?.displayName,
    image: profile?.image,
  };
};
