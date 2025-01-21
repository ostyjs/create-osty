import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { Spinner } from '@/shared/components/spinner';

import { NewNoteWidget } from '@/features/new-note-widget';
import { NoteByEvent } from '@/features/note-widget';

import { useNotesFeedWidget } from './hooks';
import { NoteFeedView } from './types';

export const NotesFeedWidget = () => {
  const { processedEvents, hasMore, loadMore, setView, view, isLoading } = useNotesFeedWidget();

  return (
    <>
      <div className="w-full h-full overflow-y-auto">
        <div className="py-2">
          <NewNoteWidget />
        </div>

        <div className="px-2">
          <div className="p-2 border rounded-sm shadow-md">
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
        </div>

        {isLoading ? (
          <Spinner />
        ) : processedEvents ? (
          <div className="pt-2 flex flex-col gap-2">
            {processedEvents.map((event) => (
              <NoteByEvent event={event} />
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
