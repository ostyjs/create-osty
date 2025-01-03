import { NDKEvent } from '@nostr-dev-kit/ndk';

import { NoteCommentsWidget } from '@/features/note-comments-widget';

import {
  NoteBookmarkBtn,
  NoteCommentBtn,
  NoteLikeBtn,
  NoteRepostBtn,
  NoteZapBtn,
} from '@/features/note-widget/components';

import { useNoteFooter } from './hooks';

export const NoteFooter = ({ event }: { event: NDKEvent }) => {
  const { inView, ref, setShowingComments, showingComments } = useNoteFooter();

  return (
    <>
      <div className="flex items-center justify-between gap-2" ref={ref}>
        <NoteCommentBtn
          onClick={() => setShowingComments((prev) => !prev)}
          event={event}
          inView={inView}
        />

        <NoteZapBtn event={event} inView={inView} />

        <NoteLikeBtn event={event} inView={inView} />

        <NoteRepostBtn event={event} inView={inView} />

        <NoteBookmarkBtn event={event} inView={inView} />
      </div>

      {showingComments && <NoteCommentsWidget event={event} />}
    </>
  );
};
