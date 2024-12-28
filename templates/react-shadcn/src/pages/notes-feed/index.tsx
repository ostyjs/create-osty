// import { useActiveUser } from 'nostr-hooks';

// import { Spinner } from '@/shared/components/spinner';

import { NotesFeedWidget } from '@/features/notes-feed-widget';

/**
 * Component that renders the Notes page.
 * This page displays a feed of notes using the NotesFeedWidget component.
 *
 * NOTE: Currently, authentication checks are commented out.
 * Uncomment the code block to enable authentication checks.
 *
 * @returns A React component that renders the notes feed page
 */
export const NotesFeedPage = () => {
  // const { activeUser } = useActiveUser();

  // if (activeUser === undefined) {
  //   return <Spinner />;
  // }

  // if (activeUser === null) {
  //   return (
  //     <div className="p-4">
  //       <h4>Not logged in</h4>
  //     </div>
  //   );
  // }

  return (
    <>
      <NotesFeedWidget />
    </>
  );
};
