import { NDKUser } from '@nostr-dev-kit/ndk';
import { useFollows } from 'nostr-hooks';
import { memo, useMemo } from 'react';

import { Button } from '@/shared/components/ui/button';

export const FollowUnfollowBtn = memo(
  ({ targetUser, activeUser }: { targetUser: NDKUser; activeUser: NDKUser }) => {
    const { follows } = useFollows({ pubkey: activeUser.pubkey });

    const isFollowed = useMemo(
      () => follows?.some((u) => u.pubkey === targetUser.pubkey),
      [follows, targetUser.pubkey],
    );

    if (activeUser.pubkey === targetUser.pubkey) {
      return null;
    }

    if (isFollowed) {
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
  },
  (prev, next) =>
    prev.targetUser.pubkey === next.targetUser.pubkey &&
    prev.activeUser.pubkey === next.activeUser.pubkey,
);
