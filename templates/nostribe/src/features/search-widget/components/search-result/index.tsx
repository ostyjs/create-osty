import { NDKEvent, NDKRelaySet } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { SearchResultItem } from '../search-result-item';

export const SearchResult = memo(
  ({ input }: { input: string }) => {
    const [events, setEvents] = useState<NDKEvent[]>([]);
    const [loading, setLoading] = useState(false);

    const { ndk } = useNdk();

    useEffect(() => {
      if (!ndk || !input) {
        setEvents([]);
        return;
      }

      setLoading(true);

      ndk
        .fetchEvents(
          [{ kinds: [0], limit: 100, search: input }],
          { closeOnEose: true },
          NDKRelaySet.fromRelayUrls(['wss://relay.nostr.band'], ndk),
        )
        .then((events) => {
          setEvents([...events]);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [ndk, input, setEvents, setLoading]);

    if (loading) {
      return <Spinner />;
    }

    return (
      <>
        {events.map((event) => (
          <SearchResultItem key={event.id} event={event} />
        ))}
      </>
    );
  },
  (prev, next) => prev.input === next.input,
);
