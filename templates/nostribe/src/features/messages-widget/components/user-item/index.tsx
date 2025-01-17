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
          className="px-4 py-2 flex items-center gap-2 hover:cursor-pointer hover:bg-secondary"
          onClick={() => navigate(`/messages/${npub}`)}
        >
          <Avatar className="bg-secondary">
            <AvatarImage
              src={profile?.image?.toString()}
              alt="profile-image"
              className="object-cover"
            />
          </Avatar>

          <div className="hidden md:block">
            {profile?.name && <div>{ellipsis(profile.name.toString(), 20)}</div>}
            <div className="text-gray-500 text-sm">
              {ellipsis(profile?.nip05?.toString() || npub, 25)}
            </div>
          </div>
        </div>
      </>
    );
  },
  (prev, next) => prev.pubkey === next.pubkey,
);
