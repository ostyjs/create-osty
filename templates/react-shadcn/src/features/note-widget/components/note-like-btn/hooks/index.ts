import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useNoteLikeBtn = (event: NDKEvent | undefined) => {
  const { count } = useAnybodyLikes(event);

  const { isLikedByMe } = useMyLike(event);

  const like = useCallback(() => !isLikedByMe && event?.react('+'), [event, isLikedByMe]);

  return { count, isLikedByMe, like };
};

const useMyLike = (event: NDKEvent | undefined) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser && event ? `note-my-likes-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);

  useEffect(() => {
    activeUser &&
      event &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Reaction], '#e': [event.id], authors: [activeUser.pubkey], limit: 1 },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, activeUser, event]);

  return { isLikedByMe: validEvents && validEvents.length > 0 };
};

const useAnybodyLikes = (event: NDKEvent | undefined) => {
  const subId = event ? `note-likes-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);

  const count = useMemo(() => validEvents?.length || 0, [validEvents]);

  useEffect(() => {
    event &&
      createSubscription({
        filters: [{ kinds: [NDKKind.Reaction], '#e': [event.id], limit: 1000 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event]);

  return { count };
};
