import { NDKEvent } from '@nostr-dev-kit/ndk';

import { NoteByNoteId } from '@/features/note-widget';

export const MentionsAndReplies = ({
  mentionsAndReplies,
}: {
  mentionsAndReplies: NDKEvent[] | undefined;
}) => {
  return mentionsAndReplies?.map((event) => (
    <>
      <div key={event.id} className="pb-2">
        <NoteByNoteId noteId={event.id} />
      </div>
    </>
  ));
};
