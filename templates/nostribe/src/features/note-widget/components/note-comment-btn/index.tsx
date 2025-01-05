import { NDKEvent } from '@nostr-dev-kit/ndk';
import { MessageSquareIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { useNoteCommentBtn } from './hooks';

export const NoteCommentBtn = ({
  event,
  onClick,
  inView,
}: {
  event: NDKEvent;
  onClick: () => void;
  inView: boolean;
}) => {
  const { count } = useNoteCommentBtn(inView ? event : undefined);

  return (
    <>
      <Button variant="link" size="icon" className="opacity-50 hover:opacity-100" onClick={onClick}>
        <div>
          <MessageSquareIcon size={18} />
        </div>

        <span className="ml-1 text-xs">{count < 10 ? count : '10+'}</span>
      </Button>
    </>
  );
};
