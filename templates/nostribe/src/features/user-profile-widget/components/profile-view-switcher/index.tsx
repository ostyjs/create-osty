import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { ProfileView } from '../../types';

export const ProfileViewSwitcher = ({
  view,
  setView,
}: {
  view: ProfileView;
  setView: React.Dispatch<React.SetStateAction<ProfileView>>;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 border-y px-1">
        <Button
          onClick={() => setView('notes')}
          size="sm"
          variant="link"
          className={cn(view == 'notes' ? 'underline underline-offset-8' : 'hover:no-underline')}
        >
          Notes
        </Button>
        <Button
          onClick={() => setView('replies')}
          size="sm"
          variant="link"
          className={cn(view == 'replies' ? 'underline underline-offset-8' : 'hover:no-underline')}
        >
          Replies
        </Button>
        <Button
          onClick={() => setView('relays')}
          size="sm"
          variant="link"
          className={cn(view == 'relays' ? 'underline underline-offset-8' : 'hover:no-underline')}
        >
          Relays
        </Button>
      </div>
    </>
  );
};
