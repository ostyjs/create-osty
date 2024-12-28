import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useNoteLikeBtn = (event: NDKEvent) => {
  const { count } = useAnybodyLikes(event);

  const { isLikedByMe } = useMyLike(event);

  const like = useCallback(() => !isLikedByMe && event.react('+'), [event, isLikedByMe]);

  return { count, isLikedByMe, like };
};

const useMyLike = (event: NDKEvent) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `note-my-likes-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Reaction], '#e': [event.id], authors: [activeUser.pubkey], limit: 1 },
        ],
      });
  }, [createSubscription]);

  return { isLikedByMe: validEvents && validEvents.length > 0 };
};

const useAnybodyLikes = (event: NDKEvent) => {
  const subId = `note-likes-${event.id}`;

  const { createSubscription, events } = useSubscription(subId);

  const validEvents = useMemo(() => events?.filter((e) => e.content === '+'), [events]);

  const count = useMemo(() => validEvents?.length || 0, [validEvents]);

  useEffect(() => {
    createSubscription({ filters: [{ kinds: [NDKKind.Reaction], '#e': [event.id], limit: 1000 }] });
  }, [createSubscription]);

  return { count };
};
