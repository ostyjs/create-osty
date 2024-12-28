import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useState } from 'react';

import { NewNoteWidget } from '@/features/new-note-widget';

import { NoteBookmarkBtn, NoteCommentBtn, NoteLikeBtn, NoteRepostBtn, NoteZapBtn } from '..';

export const NoteFooter = ({ event }: { event: NDKEvent }) => {
  const [isCommenting, setIsCommenting] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <NoteCommentBtn onClick={() => setIsCommenting((prev) => !prev)} />

        <NoteZapBtn event={event} />

        <NoteLikeBtn event={event} />

        <NoteRepostBtn event={event} />

        <NoteBookmarkBtn event={event} />
      </div>

      {isCommenting && <NewNoteWidget replyingToEvent={event} />}
    </>
  );
};
