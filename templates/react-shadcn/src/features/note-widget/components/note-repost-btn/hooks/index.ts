import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useNoteRepostBtn = (event: NDKEvent | undefined) => {
  const { count } = useAnybodyReposts(event);

  const { isRepostedByMe } = useMyRepost(event);

  const repost = useCallback(() => !isRepostedByMe && event?.repost(), [event, isRepostedByMe]);

  return { count, isRepostedByMe, repost };
};

const useMyRepost = (event: NDKEvent | undefined) => {
  const { activeUser } = useActiveUser();

  const subId = activeUser && event ? `note-my-reposts-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      event &&
      createSubscription({
        filters: [
          { kinds: [NDKKind.Repost], '#e': [event.id], authors: [activeUser.pubkey], limit: 1 },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, activeUser, event]);

  return { isRepostedByMe: events && events.length > 0 };
};

const useAnybodyReposts = (event: NDKEvent | undefined) => {
  const subId = event ? `note-reposts-${event.id}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  const count = useMemo(() => events?.length || 0, [events]);

  useEffect(() => {
    event &&
      createSubscription({
        filters: [{ kinds: [NDKKind.Repost], '#e': [event.id], limit: 100 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event]);

  return { count };
};
