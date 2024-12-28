import { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useFollows } from 'nostr-hooks';

import { Muted } from '@/shared/components/ui/typography/muted';

export const ProfileSummary = ({
  profile,
  user,
}: {
  profile: NDKUserProfile | null;
  user: NDKUser;
}) => {
  const { follows } = useFollows({ pubkey: user.pubkey });

  return (
    <>
      <div className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h4>{profile?.name}</h4>

          <div className="ml-auto flex items-center gap-2">
            <Muted>
              <span className="font-bold">{0}</span> Followers
            </Muted>
            <Muted>
              <span className="font-bold">{follows?.length || 0}</span> Following
            </Muted>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Muted>{profile?.nip05}</Muted>

          {/* <div className="ml-auto flex items-center gap-2">
            <Muted>placeholder</Muted>
          </div> */}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs">{profile?.about}</p>
        </div>
      </div>
    </>
  );
};
