import { useParams } from 'react-router-dom';

import { NoteByNoteId } from '@/features/note-widget';

export const NotePage = () => {
  const { noteId } = useParams();

  return (
    <div className="pt-2">
      <NoteByNoteId noteId={noteId} />
    </div>
  );
};
