import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useArticleRepostBtn = (event: NDKEvent | undefined) => {
  const aTag = event?.tagAddress();
  const { count } = useAnybodyReposts(event, aTag);
  const { isRepostedByMe } = useMyRepost(event, aTag);
  const repost = useCallback(() => !isRepostedByMe && event?.repost(true), [event, isRepostedByMe]);
  return { count, isRepostedByMe, repost };
};

const useMyRepost = (event: NDKEvent | undefined, aTag: string | undefined) => {
  const { activeUser } = useActiveUser();
  const subId = activeUser && event ? `article-my-reposts-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);
  useEffect(() => {
    activeUser &&
      event &&
      aTag &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Repost], '#a': [aTag], authors: [activeUser.pubkey], limit: 1 },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, activeUser, event, aTag]);
  return { isRepostedByMe: events && events.length > 0 };
};

const useAnybodyReposts = (event: NDKEvent | undefined, aTag: string | undefined) => {
  const subId = event ? `article-reposts-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);
  const count = useMemo(() => events?.length || 0, [events]);
  useEffect(() => {
    event &&
      aTag &&
      createSubscription({
        filters: [{ kinds: [NDKKind.Repost], '#a': [aTag], limit: 100 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event, aTag]);
  return { count };
};
