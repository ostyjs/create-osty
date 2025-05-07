import { useEffect, useState } from 'react';

import { TrendingNote, TrendingNotesResponse } from '../types';

function isTrendingNote(item: any): item is TrendingNote {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.pubkey === 'string' &&
    Array.isArray(item.relays) &&
    typeof item.event === 'object' &&
    item.event !== null &&
    typeof item.event.id === 'string' &&
    typeof item.event.pubkey === 'string' &&
    typeof item.event.kind === 'number' &&
    typeof item.event.created_at === 'number' &&
    typeof item.event.sig === 'string' &&
    typeof item.event.content === 'string' &&
    Array.isArray(item.event.tags) &&
    typeof item.author === 'object' &&
    item.author !== null &&
    typeof item.author.id === 'string' &&
    typeof item.author.pubkey === 'string' &&
    typeof item.author.kind === 'number' &&
    typeof item.author.created_at === 'number' &&
    typeof item.author.sig === 'string' &&
    typeof item.author.content === 'string' &&
    Array.isArray(item.author.tags)
  );
}

export const useTrendingNotesWidget = () => {
  const [trendingNotes, setTrendingNotes] = useState<TrendingNote[] | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://api.nostr.band/v0/trending/notes');
      const data = (await res.json()) as TrendingNotesResponse;

      if ('error' in data) {
        setTrendingNotes(null);
      } else {
        setTrendingNotes(Array.isArray(data.notes) ? data.notes.filter(isTrendingNote) : []);
      }
    })();
  }, [setTrendingNotes]);

  return { trendingNotes };
};
