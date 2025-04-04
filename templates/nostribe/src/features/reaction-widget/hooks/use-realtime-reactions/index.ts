import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useMemo } from 'react';
import { ReactionEvent } from '../../types';

export const useRealtimeReactions = (event: NDKEvent) => {
  const subId = event ? `reactions-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useMemo(() => {
    event &&
      createSubscription({
        filters: [
          {
            kinds: [7],
            '#e': [event.id],
          },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event]);

  // Only keep valid reactions
  const reactions = useMemo(
    () => (events ? (events.filter((r) => r.kind === 7) as ReactionEvent[]) : []),
    [events],
  );

  return reactions;
};
