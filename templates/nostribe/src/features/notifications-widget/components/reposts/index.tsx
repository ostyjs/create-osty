import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Repeat2Icon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { Spinner } from '@/shared/components/spinner';

import { ellipsis } from '@/shared/utils';

import { NoteByNoteId } from '@/features/note-widget';

type CategorizedReposts = Map<string, NDKEvent[]>;

export const Reposts = memo(({ reposts }: { reposts: NDKEvent[] | undefined }) => {
  const categorizedReposts: CategorizedReposts = useMemo(() => {
    const categorizedReposts = new Map<string, NDKEvent[]>();

    reposts?.forEach((repost) => {
      const eTags = repost.getMatchingTags('e');
      if (eTags.length > 0) {
        const eTag = eTags[eTags.length - 1];
        if (eTag.length > 0) {
          const eventId = eTag[1];
          const reposts = categorizedReposts.get(eventId) || [];
          reposts.push(repost);
          categorizedReposts.set(eventId, reposts);
        }
      }
    });

    return categorizedReposts;
  }, [reposts]);

  if (reposts === undefined) {
    return <Spinner />;
  }

  if (reposts.length === 0) {
    return <div>No reposts yet</div>;
  }

  return (
    <>
      {Array.from(categorizedReposts.keys()).map((eventId) => (
        <div key={eventId} className="px-2 py-1">
          <div className="rounded-md border flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2 px-2 py-1 border-b">
              <Repeat2Icon size={18} />

              {categorizedReposts
                .get(eventId)
                ?.map((repost) => <Repost key={repost.id} repost={repost} />)}
            </div>

            <NoteByNoteId noteId={eventId} />
          </div>
        </div>
      ))}
    </>
  );
});

const Repost = memo(({ repost }: { repost: NDKEvent }) => {
  const { profile } = useRealtimeProfile(repost.pubkey);

  return (
    <Link to={`/profile/${repost.author.npub}`}>
      <div className="flex gap-1 items-center">
        <Avatar className="bg-secondary w-5 h-5">
          <AvatarImage src={profile?.image} className="bg-secondary" />
        </Avatar>

        <p className="text-xs font-light">
          <span>{ellipsis(profile?.name?.toString() || repost.author.npub, 20)}</span>
        </p>
      </div>
    </Link>
  );
});
