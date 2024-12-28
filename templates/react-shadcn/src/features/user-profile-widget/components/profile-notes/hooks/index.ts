import { NDKUser } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useProfileNotes = ({
  user,
  notesOnly,
  repliesOnly,
}: {
  user: NDKUser;
  notesOnly?: boolean;
  repliesOnly?: boolean;
}) => {
  const subId = `user-notes-${user.pubkey}`;

  const { events, createSubscription, loadMore, hasMore, isLoading } = useSubscription(subId);

  const processedEvents = useMemo(
    () =>
      events
        ?.filter((e) => {
          if (notesOnly) {
            return e.getMatchingTags('e').length == 0;
          }

          if (repliesOnly) {
            return e.getMatchingTags('e').length > 0;
          }

          return true;
        })
        .reverse(),
    [events, notesOnly, repliesOnly],
  );

  useEffect(() => {
    if (!user.pubkey) {
      return;
    }

    createSubscription({ filters: [{ authors: [user.pubkey], kinds: [1], limit: 50 }] });
  }, [createSubscription, user.pubkey]);

  return { processedEvents, loadMore, hasMore, isLoading };
};
