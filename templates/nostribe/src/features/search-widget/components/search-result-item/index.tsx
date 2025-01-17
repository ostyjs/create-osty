import { NDKEvent, NDKUser, NDKUserProfile, profileFromEvent } from '@nostr-dev-kit/ndk';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { DialogClose } from '@/shared/components/ui/dialog';

import { ellipsis } from '@/shared/utils';

export const SearchResultItem = memo(
  ({ event }: { event: NDKEvent }) => {
    const [profile, setProfile] = useState<NDKUserProfile | undefined | null>(undefined);

    const navigate = useNavigate();

    const npub = useMemo(() => new NDKUser({ pubkey: event.pubkey }).npub, [event.pubkey]);

    useEffect(() => {
      (async () => {
        try {
          const profile = profileFromEvent(event);

          if (profile.nip05 && typeof profile.nip05 === 'string') {
            const isValidated = await event.author.validateNip05(profile.nip05);

            if (isValidated) {
              setProfile(profile);
            } else {
              setProfile(null);
            }
          } else {
            setProfile(profile);
          }
        } catch (_) {}
      })();
    }, [event.id]);

    if (!profile) {
      return null;
    }

    return (
      <>
        <DialogClose asChild>
          <div
            className="p-4 border-b flex items-center gap-2 hover:cursor-pointer hover:bg-secondary"
            onClick={() => navigate(`/profile/${npub}`)}
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
        </DialogClose>
      </>
    );
  },
  (prev, next) => prev.event.id === next.event.id,
);
