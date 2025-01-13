import { NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useSubscription } from 'nostr-hooks';
import { memo, useEffect, useMemo } from 'react';

import { UserItem } from '../user-item';

export const ListOfUsers = memo(() => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `messages-${activeUser.pubkey}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    if (!activeUser) {
      return;
    }

    createSubscription({
      filters: [
        { kinds: [NDKKind.EncryptedDirectMessage], '#p': [activeUser.pubkey] },
        { kinds: [NDKKind.EncryptedDirectMessage], authors: [activeUser.pubkey] },
      ],
    });
  }, [activeUser, createSubscription]);

  const uniquePubkeys = useMemo(() => {
    if (!events || events.length === 0) {
      return [];
    }

    return events
      .filter((e) => e.pubkey !== activeUser?.pubkey)
      .filter((e, i, self) => self.findIndex((t) => t.pubkey === e.pubkey) === i)
      .map((e) => e.pubkey);
  }, [events, activeUser]);

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-y-auto">
        {(uniquePubkeys || []).map((p) => (
          <UserItem key={p.toString()} pubkey={p} />
        ))}
      </div>
    </>
  );
});
