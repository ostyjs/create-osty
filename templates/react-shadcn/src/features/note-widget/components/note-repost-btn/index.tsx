import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Repeat2Icon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteRepostBtn } from './hooks';

export const NoteRepostBtn = ({ event }: { event: NDKEvent }) => {
  const { count, isRepostedByMe, repost } = useNoteRepostBtn(event);

  return (
    <>
      <Button
        variant="link"
        size="icon"
        className={cn(isRepostedByMe ? 'text-green-600' : 'opacity-50 hover:opacity-100')}
        onClick={repost}
      >
        <Repeat2Icon size={18} />

        <span className="ml-1 text-xs">{count < 100 ? count : '100+'}</span>
      </Button>
    </>
  );
};
