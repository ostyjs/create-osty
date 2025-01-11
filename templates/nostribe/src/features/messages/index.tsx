import { memo } from 'react';

import { Chats, ListOfUsers } from './components';

export const Messages = memo(
  ({ npub }: { npub: string | undefined }) => {
    return (
      <>
        <div className="flex overflow-hidden w-full h-full">
          <div className="max-w-72 w-full border-r overflow-y-hidden h-full">
            <ListOfUsers />
          </div>

          <div className="w-full h-full overflow-hidden">{npub && <Chats npub={npub} />}</div>
        </div>
      </>
    );
  },
  (prev, next) => prev.npub === next.npub,
);
