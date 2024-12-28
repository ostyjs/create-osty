import { useActiveUser, useFollows, useSubscription } from 'nostr-hooks';
import { useEffect, useMemo, useState } from 'react';

import { NoteFeedView } from '../types';

export const useNotesFeedWidget = () => {
  const [view, setView] = useState<NoteFeedView>('Notes');

  const { activeUser } = useActiveUser();

  const { follows } = useFollows({ pubkey: activeUser?.pubkey });

  const subId = activeUser ? `notes-feed-${activeUser.pubkey}` : undefined;

  const { createSubscription, events, loadMore, hasMore, isLoading } = useSubscription(subId);

  const processedEvents = useMemo(
    () =>
      events
        ?.filter((e) => {
          if (view === 'Notes') {
            return e.getMatchingTags('e').length == 0;
          }

          if (view === 'Replies') {
            return e.getMatchingTags('e').length > 0;
          }

          return true;
        })
        .reverse(),
    [events, view],
  );

  useEffect(() => {
    if (!activeUser || !follows) {
      return;
    }

    createSubscription({
      filters: [
        { kinds: [1], limit: 50, authors: [activeUser.pubkey, ...follows.map((u) => u.pubkey)] },
      ],
    });
  }, [createSubscription, follows, activeUser]);

  return { processedEvents, loadMore, hasMore, isLoading, setView, view };
};
