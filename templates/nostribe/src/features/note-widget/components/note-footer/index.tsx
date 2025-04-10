import { NDKEvent } from '@nostr-dev-kit/ndk';
import { memo } from 'react';

import { NoteCommentsWidget } from '@/features/note-comments-widget';
import { ReactionWidget } from '@/features/reaction-widget';

import {
  NoteBookmarkBtn,
  NoteCommentBtn,
  NoteLikeBtn,
  NoteRepostBtn,
  NoteZapBtn,
} from '@/features/note-widget/components';

import { useNoteFooter } from './hooks';

export const NoteFooter = memo(
  ({ event }: { event: NDKEvent }) => {
    const { inView, ref, setShowingComments, showingComments } = useNoteFooter();

    return (
      <>
        {inView && <ReactionWidget event={event} />}

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

        {showingComments && (
          <div className="pb-2">
            <NoteCommentsWidget event={event} />
          </div>
        )}
      </>
    );
  },
  (prev, next) => prev.event.id === next.event.id,
);
