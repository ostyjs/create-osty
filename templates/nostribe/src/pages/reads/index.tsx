import { NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useFollows, useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

import { ArticleWidget } from '@/features/article-widget';

export const ReadsPage = () => {
  const { activeUser } = useActiveUser();
  const { follows } = useFollows({ pubkey: activeUser?.pubkey });
  const subId = activeUser ? `reads-feed-${activeUser.pubkey}` : undefined;
  const { createSubscription, events, isLoading } = useSubscription(subId);

  useEffect(() => {
    if (!activeUser || follows === undefined) return;
    createSubscription({
      filters: [
        {
          kinds: [NDKKind.Article],
          limit: 20,
          authors: [activeUser.pubkey, ...(follows || []).map((u) => u.pubkey)],
        },
      ],
      opts: { groupableDelay: 500 },
    });
  }, [createSubscription, follows, activeUser]);

  const reversedEvents = useMemo(() => (events ? [...events].reverse() : []), [events]);

  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-auto">
      <div className="w-full">
        <h2 className="text-2xl font-bold px-4 py-2 border-b">Nostr Reads</h2>

        {isLoading && <p>Loading articles...</p>}

        {!isLoading && events && events.length === 0 && (
          <p className="text-muted-foreground">No articles found from your follows.</p>
        )}

        {reversedEvents.length > 0 &&
          reversedEvents.map((event) => <ArticleWidget key={event.id} event={event} />)}
      </div>
    </div>
  );
};
