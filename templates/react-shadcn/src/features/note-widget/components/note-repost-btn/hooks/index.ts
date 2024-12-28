import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useNoteRepostBtn = (event: NDKEvent) => {
  const { count } = useAnybodyReposts(event);

  const { isRepostedByMe } = useMyRepost(event);

  const repost = useCallback(() => !isRepostedByMe && event.repost(), [event, isRepostedByMe]);

  return { count, isRepostedByMe, repost };
};

const useMyRepost = (event: NDKEvent) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `note-my-reposts-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Repost], '#e': [event.id], authors: [activeUser.pubkey], limit: 1 },
        ],
      });
  }, [createSubscription]);

  return { isRepostedByMe: events && events.length > 0 };
};

const useAnybodyReposts = (event: NDKEvent) => {
  const subId = `note-reposts-${event.id}`;

  const { createSubscription, events } = useSubscription(subId);

  const count = useMemo(() => events?.length || 0, [events]);

  useEffect(() => {
    createSubscription({ filters: [{ kinds: [NDKKind.Repost], '#e': [event.id], limit: 100 }] });
  }, [createSubscription]);

  return { count };
};
