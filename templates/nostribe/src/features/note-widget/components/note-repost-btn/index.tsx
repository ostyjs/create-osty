import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Repeat2Icon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { useNoteRepostBtn } from './hooks';

export const NoteRepostBtn = ({ event, inView }: { event: NDKEvent; inView: boolean }) => {
  const { count, isRepostedByMe, repost } = useNoteRepostBtn(inView ? event : undefined);

  return (
    <>
      <Button
        variant="link"
        className={cn('px-0', isRepostedByMe ? 'text-green-600' : 'opacity-50 hover:opacity-100')}
        onClick={repost}
      >
        <div>
          <Repeat2Icon size={18} />
        </div>

        <span className="ml-1 text-xs">{count < 100 ? count : '100+'}</span>
      </Button>
    </>
  );
};
