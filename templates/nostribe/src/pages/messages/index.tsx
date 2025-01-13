import { useActiveUser } from 'nostr-hooks';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components/spinner';

import { Messages } from '@/features/messages';

export const MessagesPage = () => {
  const { npub } = useParams();

  const { activeUser } = useActiveUser();

  if (activeUser === undefined) {
    return <Spinner />;
  }

  if (activeUser === null) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center">
        <h3>Welcome to Nostribe!</h3>
      </div>
    );
  }

  return (
    <>
      <div className="h-full w-full">
        <Messages npub={npub} />
      </div>
    </>
  );
};
