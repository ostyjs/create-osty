import { NDKEvent } from '@nostr-dev-kit/ndk';
import { BookmarkIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteBookmarkBtn } from './hooks';

export const NoteBookmarkBtn = ({ event, inView }: { event: NDKEvent; inView: boolean }) => {
  const { isBookmarkedByMe, bookmark, unbookmark } = useNoteBookmarkBtn(inView ? event : undefined);

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
