import { useLocalStore } from '@/shared/store';
import { NDKEvent, NDKFilter, NDKSubscription, NDKSubscriptionOptions } from '@nostr-dev-kit/ndk';
import { useMemo, useRef, useState } from 'react';

type Status = 'idle' | 'subscribed' | 'eose';

export const useSubscribe = () => {
  const subscriptionRef = useRef<NDKSubscription | undefined>(undefined);

  const [status, setStatus] = useState<Status>('idle');
  const [events, setEvents] = useState<NDKEvent[]>([]);

  const ndk = useLocalStore((state) => state.ndk);

  const clearEvents = () => {
    setEvents([]);
  };

  const subscribe = (filters: NDKFilter[], opts?: NDKSubscriptionOptions) => {
    if (status == 'idle') {
      setStatus('subscribed');

      ndk.connect();

      subscriptionRef.current = ndk.subscribe(filters, opts);
      subscriptionRef.current.on('event', (event: NDKEvent) => {
        setEvents((prev) => [...prev, event]);
      });
      subscriptionRef.current.on('eose', () => {
        setStatus('eose');

        if (opts?.closeOnEose) {
          unSubscribe();
        }
      });
    }
  };

  const unSubscribe = () => {
    subscriptionRef.current?.stop();
    subscriptionRef.current = undefined;

    setStatus('idle');
  };

  const sortedEvents = useMemo(
    () => events.sort((a, b) => b.created_at! - a.created_at!),
    [events],
  );

  return { status, events: sortedEvents, subscribe, unSubscribe, clearEvents };
};
