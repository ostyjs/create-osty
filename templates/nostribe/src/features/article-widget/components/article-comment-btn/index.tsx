import { NDKEvent } from '@nostr-dev-kit/ndk';
import { MessageSquareIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { useArticleCommentBtn } from './hooks';

export const ArticleCommentBtn = ({ event, onClick }: { event: NDKEvent; onClick: () => void }) => {
  const { count } = useArticleCommentBtn(event);

  return (
    <>
      <Button variant="link" className="px-0 opacity-50 hover:opacity-100" onClick={onClick}>
        <div>
          <MessageSquareIcon size={18} />
        </div>

        <span className="ml-1 text-xs">{count < 10 ? count : '10+'}</span>
      </Button>
    </>
  );
};
