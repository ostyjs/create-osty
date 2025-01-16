import { useParams } from 'react-router-dom';

import { NoteByNoteId } from '@/features/note-widget';

export const NotePage = () => {
  const { noteId } = useParams();

  return (
    <div className="pt-2 h-full w-full overflow-y-auto">
      <NoteByNoteId noteId={noteId} />
    </div>
  );
};
