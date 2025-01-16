import { useEffect, useState } from 'react';

import { TrendingNote, TrendingNotesResponse } from '../types';

export const useTrendingNotesWidget = () => {
  const [trendingNotes, setTrendingNotes] = useState<TrendingNote[] | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://api.nostr.band/v0/trending/notes');
      const data = (await res.json()) as TrendingNotesResponse;

      if ('error' in data) {
        setTrendingNotes(null);
      } else {
        setTrendingNotes(data.notes);
      }
    })();
  }, [setTrendingNotes]);

  return { trendingNotes };
};
