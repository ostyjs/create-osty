import { useDebounceValue } from 'usehooks-ts';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';

import { SearchResult } from './components';

export const SearchWidget = ({ children }: { children: React.ReactNode }) => {
  const [debouncedValue, setValue] = useDebounceValue('', 500);

  return (
    <Dialog onOpenChange={(open) => !open && setValue('')}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Nostr</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Input
            id="search"
            autoComplete="off"
            placeholder="Search..."
            onChange={(event) => setValue(event.target.value)}
          />

          <div className="h-full max-h-80 overflow-y-auto overflow-x-hidden">
            <SearchResult input={debouncedValue} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
