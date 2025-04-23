import { NDKEvent, NDKKind, zapInvoiceFromEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useArticleZapBtn = (event: NDKEvent | undefined) => {
  const aTag = event?.tagAddress();
  const subId = event ? `article-zaps-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    aTag &&
      createSubscription({
        filters: [{ kinds: [NDKKind.Zap], '#a': [aTag], limit: 1000 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, aTag]);

  const count = useMemo(() => events?.length || 0, [events]);
  const totalAmount = useMemo(
    () =>
      events?.reduce((acc, e) => acc + Math.floor(zapInvoiceFromEvent(e)?.amount || 0) / 1000, 0) ||
      0,
    [events],
  );

  return { count, totalAmount };
};
