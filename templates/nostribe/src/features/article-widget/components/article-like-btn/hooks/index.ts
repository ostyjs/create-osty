import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useArticleLikeBtn = (event: NDKEvent | undefined) => {
  const aTag = event?.tagAddress();
  const { count } = useAnybodyLikes(event, aTag);
  const { isLikedByMe } = useMyLike(event, aTag);
  const like = useCallback(() => !isLikedByMe && event?.react('+', true), [event, isLikedByMe]);
  return { count, isLikedByMe, like };
};

const useMyLike = (event: NDKEvent | undefined, aTag: string | undefined) => {
  const { activeUser } = useActiveUser();
  const subId = activeUser && event ? `article-my-likes-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);
  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);
  useEffect(() => {
    activeUser &&
      event &&
      aTag &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Reaction], '#a': [aTag], authors: [activeUser.pubkey], limit: 1 },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, activeUser, event, aTag]);
  return { isLikedByMe: validEvents && validEvents.length > 0 };
};

const useAnybodyLikes = (event: NDKEvent | undefined, aTag: string | undefined) => {
  const subId = event ? `article-likes-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);
  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);
  const count = useMemo(() => validEvents?.length || 0, [validEvents]);
  useEffect(() => {
    event &&
      aTag &&
      createSubscription({
        filters: [{ kinds: [NDKKind.Reaction], '#a': [aTag], limit: 1000 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event, aTag]);
  return { count };
};
