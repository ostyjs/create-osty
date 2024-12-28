import { MessageSquareIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

export const NoteCommentBtn = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <Button variant="link" size="icon" className="opacity-50 hover:opacity-100" onClick={onClick}>
        <MessageSquareIcon size={18} />
      </Button>
    </>
  );
};
