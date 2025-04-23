import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BookmarkIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useArticleBookmarkBtn } from './hooks';

export const ArticleBookmarkBtn = ({ event }: { event: NDKEvent }) => {
  const { isBookmarkedByMe, bookmark, unbookmark } = useArticleBookmarkBtn(event);

  return (
    <>
      <Button
        variant="link"
        className={cn('px-0', isBookmarkedByMe ? 'text-green-600' : 'opacity-50 hover:opacity-100')}
        onClick={isBookmarkedByMe ? unbookmark : bookmark}
      >
        <BookmarkIcon size={18} />
      </Button>
    </>
  );
};
