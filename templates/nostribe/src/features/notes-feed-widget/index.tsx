import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { Spinner } from '@/shared/components/spinner';

import { cn } from '@/shared/utils';

import { NewNoteWidget } from '@/features/new-note-widget';
import { NoteByEvent } from '@/features/note-widget';

import { useNotesFeedWidget } from './hooks';
import { NoteFeedView } from './types';

export const NotesFeedWidget = () => {
  const { processedEvents, hasMore, loadMore, setView, view, isLoading } = useNotesFeedWidget();

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="border-b">
          <NewNoteWidget />
        </div>

        <div className="p-2 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {view === 'Notes' ? 'Notes' : 'Replies'}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={view}
                onValueChange={(v) => setView(v as NoteFeedView)}
              >
                <DropdownMenuRadioItem value="Notes">Notes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Replies">Replies</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isLoading ? (
          <Spinner />
        ) : processedEvents ? (
          <div className="pt-2 flex flex-col gap-2">
            {processedEvents.map((event, i) => (
              <div key={event.id} className={cn({ 'border-b': i !== processedEvents.length - 1 })}>
                <NoteByEvent event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="pt-2 px-2">
            <p>No events found. Follow some users to see their notes here.</p>
          </div>
        )}

        {hasMore && (
          <div className="py-4 flex justify-center">
            <Button variant="secondary" onClick={() => loadMore(100)} className="w-full">
              Load more
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
