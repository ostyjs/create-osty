import { NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useFollows, useSubscription } from 'nostr-hooks';
import { useEffect } from 'react';

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

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-2xl font-bold mb-4">Nostr Reads</h2>
      {isLoading && <p>Loading articles...</p>}
      {!isLoading && events && events.length === 0 && (
        <p className="text-muted-foreground">No articles found from your follows.</p>
      )}
      <ul className="w-full max-w-2xl">
        {events &&
          events.map((event) => {
            const titleTag = event.tags.find((tag) => tag[0] === 'title');
            const title = titleTag ? titleTag[1] : undefined;
            return (
              <li key={event.id} className="border-b py-2">
                {title || event.content?.slice(0, 64) || event.id}
              </li>
            );
          })}
      </ul>
    </div>
  );
};
