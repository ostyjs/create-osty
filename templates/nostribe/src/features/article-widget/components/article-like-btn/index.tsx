import { NDKEvent } from '@nostr-dev-kit/ndk';
import { HeartIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useArticleLikeBtn } from './hooks';

export const ArticleLikeBtn = ({ event }: { event: NDKEvent }) => {
  const { count, isLikedByMe, like } = useArticleLikeBtn(event);

  return (
    <>
      <Button
        variant="link"
        className={cn('px-0', isLikedByMe ? 'text-red-600' : 'opacity-50 hover:opacity-100')}
        onClick={like}
      >
        <div>
          <HeartIcon size={18} />
        </div>

        <span className="ml-1 text-xs">{count < 1000 ? count : '1K+'}</span>
      </Button>
    </>
  );
};
