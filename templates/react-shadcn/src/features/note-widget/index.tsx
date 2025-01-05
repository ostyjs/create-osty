import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { NoteContent, NoteFooter, NoteHeader } from './components';

export const NoteByEvent = memo(
  ({ event }: { event: NDKEvent | null | undefined }) => {
    if (event === undefined) {
      return <Spinner />;
    }

    if (event === null) {
      return <div className="px-2 border-b">Note not found</div>;
    }

    if (event) {
      return (
        <>
          <div className="px-2">
            <NoteHeader event={event} />
            <NoteContent event={event} />
            <NoteFooter event={event} />
          </div>
        </>
      );
    }
  },
  (prev, next) => prev.event?.id === next.event?.id,
);

export const NoteByNoteId = memo(
  ({ noteId }: { noteId: string | undefined }) => {
    const [event, setEvent] = useState<NDKEvent | null | undefined>(undefined);

    const { ndk } = useNdk();

    useEffect(() => {
      if (!ndk || !noteId) {
        return;
      }

      ndk.fetchEvent(noteId).then((event) => {
        setEvent(event);
      });
    }, [noteId, ndk, setEvent]);

    return <NoteByEvent event={event} />;
  },
  (prev, next) => prev.noteId === next.noteId,
);
