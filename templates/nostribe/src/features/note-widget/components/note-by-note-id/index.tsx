import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';

import { NoteContent } from '../note-content';

export const NoteByNoteId = memo(
  ({ noteId }: { noteId: string }) => {
    const { ndk } = useNdk();
    const [event, setEvent] = useState<NDKEvent | null>(null);

    useEffect(() => {
      if (!ndk) return;

      const fetchEvent = async () => {
        const event = await ndk.fetchEvent({ ids: [noteId] });
        if (event) {
          setEvent(event);
        }
      };

      fetchEvent();
    }, [ndk, noteId]);

    if (!event) {
      return null;
    }

    return <NoteContent event={event} />;
  },
  (prev, next) => prev.noteId === next.noteId,
);
