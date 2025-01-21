import { NDKEvent } from '@nostr-dev-kit/ndk';

import { NoteByNoteId } from '@/features/note-widget';

export const MentionsAndReplies = ({
  mentionsAndReplies,
}: {
  mentionsAndReplies: NDKEvent[] | undefined;
}) => {
  return mentionsAndReplies?.map((event) => (
    <>
      <div key={event.id} className="px-2 py-1">
        <div className="pt-2 rounded-md border flex flex-col gap-2">
          <NoteByNoteId noteId={event.id} />
        </div>
      </div>
    </>
  ));
};
