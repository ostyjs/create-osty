import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useEffect, useState } from 'react';

import { Spinner } from '@/shared/components/spinner';

import { NoteContent, NoteFooter, NoteHeader } from './components';

export const NoteByEvent = ({ event }: { event: NDKEvent | null | undefined }) => {
  if (event === undefined) {
    return <Spinner />;
  }

  if (event === null) {
    return <div>Note not found</div>;
  }

  if (event) {
    return (
      <>
        <div className="border-b">
          <NoteHeader event={event} />
          <NoteContent event={event} />
          <NoteFooter event={event} />
        </div>
      </>
    );
  }
};

export const NoteByNoteId = ({ noteId }: { noteId: string | undefined }) => {
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
};
