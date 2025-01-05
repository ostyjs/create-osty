import { NDKUser } from '@nostr-dev-kit/ndk';
import { useFollows } from 'nostr-hooks';

import { Button } from '@/shared/components/ui/button';

export const FollowUnfollowBtn = ({
  targetUser,
  activeUser,
}: {
  targetUser: NDKUser;
  activeUser: NDKUser;
}) => {
  const { follows } = useFollows({ pubkey: activeUser.pubkey });

  if (activeUser.pubkey === targetUser.pubkey) {
    return null;
  }

  if (follows?.some((u) => u.pubkey === targetUser.pubkey)) {
    return (
      <>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => activeUser.unfollow(targetUser)}
        >
          Unfollow
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => activeUser.follow(targetUser)}
        >
          Follow
        </Button>
      </>
    );
  }
};
