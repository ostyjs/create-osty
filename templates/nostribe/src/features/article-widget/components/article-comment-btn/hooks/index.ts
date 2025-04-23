import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useArticleCommentBtn = (event: NDKEvent | undefined) => {
  const articleAddress = event?.tagAddress();
  const subId = event ? `article-comments-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    if (!articleAddress) return;
    createSubscription({
      filters: [{ kinds: [1111], '#A': [articleAddress], limit: 100 }],
      opts: { groupableDelay: 500 },
    });
  }, [createSubscription, articleAddress]);

  const count = useMemo(
    () =>
      events?.filter(
        (e) =>
          e.kind === 1111 &&
          e.getMatchingTags('A').some((tag) => tag.length > 1 && tag[1] === articleAddress),
      ).length || 0,
    [events, articleAddress],
  );

  return { count, articleAddress };
};
