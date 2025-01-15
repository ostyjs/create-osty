import { NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { ellipsis } from '@/shared/utils';

export const UserItem = memo(
  ({ pubkey }: { pubkey: string }) => {
    const { profile } = useRealtimeProfile(pubkey);

    const navigate = useNavigate();

    const npub = useMemo(() => new NDKUser({ pubkey }).npub, [pubkey]);

    return (
      <>
        <div
          className="p-4 border-b flex items-center gap-2 hover:cursor-pointer hover:bg-secondary"
          onClick={() => navigate(`/messages/${npub}`)}
        >
          <Avatar className="bg-secondary">
            <AvatarImage src={profile?.image} alt="profile-image" className="object-cover" />
          </Avatar>

          <div>
            {profile && !!profile.name && <div>{profile.name}</div>}
            <div className="text-gray-500 text-sm">
              {profile && profile.nip05 ? profile.nip05 : ellipsis(npub, 10)}
            </div>
          </div>
        </div>
      </>
    );
  },
  (prev, next) => prev.pubkey === next.pubkey,
);
