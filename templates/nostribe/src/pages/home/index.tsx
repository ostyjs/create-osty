import { useActiveUser } from 'nostr-hooks';

import { NotesFeedWidget } from '@/features/notes-feed-widget';

export const HomePage = () => {
  const { activeUser } = useActiveUser();

  return (
    <>
      {activeUser ? (
        <NotesFeedWidget />
      ) : (
        <div className="flex flex-col h-full w-full items-center justify-center">
          <h3>Welcome to Nostribe!</h3>
          <p>Log-in to view and create notes</p>
        </div>
      )}
    </>
  );
};
