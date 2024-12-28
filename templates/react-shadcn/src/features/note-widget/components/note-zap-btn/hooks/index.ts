import { NDKEvent, NDKKind, zapInvoiceFromEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useNoteZapBtn = (event: NDKEvent) => {
  const { count, totalAmount } = useAnybodyZaps(event);

  const { isZapedByMe } = useMyZap(event);

  return { count, isZapedByMe, totalAmount };
};

const useMyZap = (event: NDKEvent) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `note-my-zaps-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Zap], '#e': [event.id], authors: [activeUser.pubkey], limit: 1 },
        ],
      });
  }, [createSubscription]);

  return { isZapedByMe: events && events.length > 0 };
};

const useAnybodyZaps = (event: NDKEvent) => {
  const subId = `note-zaps-${event.id}`;

  const { createSubscription, events } = useSubscription(subId);

  const count = useMemo(() => events?.length || 0, [events]);

  const totalAmount = useMemo(
    () =>
      events?.reduce((acc, e) => acc + Math.floor(zapInvoiceFromEvent(e)?.amount || 0) / 1000, 0) ||
      0,
    [events],
  );

  useEffect(() => {
    createSubscription({ filters: [{ kinds: [NDKKind.Zap], '#e': [event.id], limit: 1000 }] });
  }, [createSubscription]);

  return { count, totalAmount };
};
