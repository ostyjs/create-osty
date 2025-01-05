import { NDKUser } from '@nostr-dev-kit/ndk';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import { useActiveUser } from 'nostr-hooks';

// import { Spinner } from '@/shared/components/spinner';

import { UserProfileWidget } from '@/features/user-profile-widget';

/**
 * Profile page component that displays user profile information.
 *
 * This component takes a `npub` parameter from the URL and renders
 * a user profile widget for the corresponding user. If no valid npub
 * is provided or the user cannot be found, it displays an error message.
 *
 * NOTE: Currently, authentication checks are commented out.
 * Uncomment the code block to enable authentication checks.
 *
 * @returns A React component that renders either:
 * - UserProfileWidget for valid user
 * - "Invalid profile" message for invalid/missing npub
 */
export const ProfilePage = () => {
  // const { activeUser } = useActiveUser();

  const { npub } = useParams();

  const user = useMemo(() => (npub ? new NDKUser({ npub }) : undefined), [npub]);

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

  if (!npub || !user) {
    return <p>Invalid profile</p>;
  }

  return (
    <>
      <UserProfileWidget user={user} />
    </>
  );
};
