import { NDKEvent } from '@nostr-dev-kit/ndk';

import { Button } from '@/shared/components/ui/button';

import { Spinner } from '@/shared/components/spinner';

import { cn } from '@/shared/utils';

import { NewNoteWidget } from '@/features/new-note-widget';
import { NoteByEvent } from '@/features/note-widget';

import { useNoteCommentsWidget } from './hooks';

export const NoteCommentsWidget = ({ event }: { event: NDKEvent }) => {
  const { processedEvents, hasMore, loadMore } = useNoteCommentsWidget(event);

  return (
    <>
      <NewNoteWidget replyingToEvent={event} />

      <div className="bg-foreground/5 pl-4 -mx-2">
        {processedEvents === undefined ? (
          <Spinner />
        ) : (
          processedEvents.length > 0 && (
            <div className="pt-2 flex flex-col gap-2">
              {processedEvents.map((event, i) => (
                <div className={cn({ 'border-b': i !== processedEvents.length - 1 })}>
                  <NoteByEvent key={event.id} event={event} />
                </div>
              ))}
            </div>
          )
        )}

        {hasMore && (
          <div className="py-4 flex justify-center">
            <Button variant="secondary" onClick={() => loadMore(50)} className="w-full">
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
