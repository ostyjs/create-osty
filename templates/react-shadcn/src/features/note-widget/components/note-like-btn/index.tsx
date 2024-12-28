import { NDKEvent } from '@nostr-dev-kit/ndk';
import { HeartIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteLikeBtn } from './hooks';

export const NoteLikeBtn = ({ event }: { event: NDKEvent }) => {
  const { count, isLikedByMe, like } = useNoteLikeBtn(event);

  return (
    <>
      <Button
        variant="link"
        size="icon"
        className={cn(isLikedByMe ? 'text-red-600' : 'opacity-50 hover:opacity-100')}
        onClick={like}
      >
        <HeartIcon size={18} />

        <span className="ml-1 text-xs">{count < 1000 ? count : '1K+'}</span>
      </Button>
    </>
  );
};
