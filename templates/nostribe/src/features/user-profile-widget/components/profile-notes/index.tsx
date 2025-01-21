import { NDKUser } from '@nostr-dev-kit/ndk';
import { memo } from 'react';

import { Button } from '@/shared/components/ui/button';

import { NoteByEvent } from '@/features/note-widget';

import { useProfileNotes } from './hooks';

export const ProfileNotes = memo(
  ({
    user,
    notesOnly,
    repliesOnly,
  }: {
    user: NDKUser;
    notesOnly?: boolean;
    repliesOnly?: boolean;
  }) => {
    const { processedEvents, loadMore, hasMore, isLoading } = useProfileNotes({
      user,
      notesOnly,
      repliesOnly,
    });

    return (
      <>
        <div className="flex flex-col gap-2">
          {processedEvents?.map((event) => <NoteByEvent key={event.id} event={event} />)}
        </div>

        {hasMore && (
          <div className="py-4 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => loadMore(50)}
              className="w-full"
              disabled={isLoading}
            >
              Load more
            </Button>
          </div>
        )}
      </>
    );
  },
  (prev, next) =>
    prev.user.pubkey === next.user.pubkey &&
    prev.notesOnly === next.notesOnly &&
    prev.repliesOnly === next.repliesOnly,
);
