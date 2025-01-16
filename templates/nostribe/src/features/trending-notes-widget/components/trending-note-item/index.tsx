import { NDKEvent, NDKUserProfile, NostrEvent, profileFromEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { ellipsis } from '@/shared/utils';

import { TrendingNote } from '../../types';

export const TrendingNoteItem = memo(
  ({ note }: { note: TrendingNote }) => {
    const [profile, setProfile] = useState<NDKUserProfile | null | undefined>(undefined);

    const { ndk } = useNdk();

    useEffect(() => {
      const profile = profileFromEvent(new NDKEvent(ndk, note.author as NostrEvent));

      setProfile(profile);
    }, [note.author, setProfile, ndk]);

    return (
      <>
        <Link className="flex gap-2 group" to={`/note/${note.id}`}>
          <Avatar className="w-8 h-8 bg-secondary">
            <AvatarImage src={profile?.image} alt="profile-image" className="object-cover" />
          </Avatar>

          <div>
            <p className="text-sm font-bold text-primary/60 group-hover:text-primary/100">
              {profile?.name}
            </p>

            <p className="text-sm text-primary/60 group-hover:text-primary/100 [overflow-wrap:anywhere] pr-2">
              {ellipsis(note.event.content, 50)}
            </p>
          </div>
        </Link>
      </>
    );
  },
  (prev, next) => prev.note.id === next.note.id,
);
