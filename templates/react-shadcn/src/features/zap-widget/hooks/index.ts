import { NDKEvent, NDKTag, NDKUser } from '@nostr-dev-kit/ndk';
import { useNdk, useProfile } from 'nostr-hooks';
import { useState } from 'react';

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

  const { profile } = useProfile({ pubkey: target?.pubkey });

  const process = () => {
    if (!target || !ndk) return;

    setProcessing(true);

    if (!ndk.signer) {
      toast({ description: 'You need to login first!' });
      setProcessing(false);
      return;
    }

    const extraTags: NDKTag[] | undefined =
      target instanceof NDKEvent ? [['e', target.id]] : undefined;

    const ndkUser = ndk.getUser({ pubkey: target.pubkey });
    ndkUser.zap(selectedAmount.amount * 1000, comment, extraTags).then((invoice) => {
      if (typeof invoice === 'string') {
        payInvoiceByWebln(invoice)
          .then((res) => {
            if (res) {
              toast({ title: 'Successful ⚡️⚡️⚡️' });
              setIsModalOpen(false);
            } else {
              toast({ title: 'Failed', variant: 'destructive' });
            }
          })
          .finally(() => setProcessing(false));
      } else {
        toast({ title: 'Failed', variant: 'destructive' });
        setProcessing(false);
      }
    });
  };

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
