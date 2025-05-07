import { NDKEvent } from '@nostr-dev-kit/ndk';
import { ThumbsUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteLikeBtn } from './hooks';

export const NoteLikeBtn = ({ event, inView }: { event: NDKEvent; inView: boolean }) => {
  const { count, isLikedByMe, like } = useNoteLikeBtn(inView ? event : undefined);

  return (
    <>
      <Button
        variant="link"
        className={cn('px-0', isLikedByMe ? 'text-red-600' : 'opacity-50 hover:opacity-100')}
        onClick={like}
      >
        <div>
          <ThumbsUp size={18} />
        </div>

        <span className="ml-1 text-xs">{count < 1000 ? count : '1K+'}</span>
      </Button>
    </>
  );
};
