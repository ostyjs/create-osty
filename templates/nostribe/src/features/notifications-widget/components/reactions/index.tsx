import { NDKEvent } from '@nostr-dev-kit/ndk';
import { ThumbsUpIcon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { Spinner } from '@/shared/components/spinner';

import { ellipsis } from '@/shared/utils';

import { NoteByNoteId } from '@/features/note-widget';

type CategorizedReactions = Map<string, NDKEvent[]>;

export const Reactions = memo(({ reactions }: { reactions: NDKEvent[] | undefined }) => {
  const categorizedReactions: CategorizedReactions = useMemo(() => {
    const categorizedReactions = new Map<string, NDKEvent[]>();

    reactions?.forEach((reaction) => {
      const eTags = reaction.getMatchingTags('e');
      if (eTags.length > 0) {
        const eTag = eTags[eTags.length - 1];
        if (eTag.length > 0) {
          const eventId = eTag[1];
          const reactions = categorizedReactions.get(eventId) || [];
          reactions.push(reaction);
          categorizedReactions.set(eventId, reactions);
        }
      }
    });

    return categorizedReactions;
  }, [reactions]);

  if (reactions === undefined) {
    return <Spinner />;
  }

  if (reactions.length === 0) {
    return <div>No reactions yet</div>;
  }

  return (
    <>
      {Array.from(categorizedReactions.keys()).map((eventId) => (
        <div key={eventId} className="px-2 pb-2">
          <div className="border rounded-sm shadow-md bg-background transition-colors duration-500 ease-out hover:border-primary/30">
            <div className="flex flex-wrap items-center gap-2 px-2 py-2">
              <ThumbsUpIcon size={18} />

              {categorizedReactions
                .get(eventId)
                ?.map((reaction) => <Reaction key={reaction.id} reaction={reaction} />)}
            </div>

            <div className="pb-2">
              <NoteByNoteId noteId={eventId} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

const Reaction = memo(({ reaction }: { reaction: NDKEvent }) => {
  const { profile } = useRealtimeProfile(reaction.pubkey);

  return (
    <Link to={`/profile/${reaction.author.npub}`}>
      <div className="flex gap-1 items-center">
        <Avatar className="bg-secondary w-5 h-5">
          <AvatarImage src={profile?.image} className="bg-secondary" />
        </Avatar>

        <p className="text-xs font-light">
          <span>{ellipsis(profile?.name?.toString() || reaction.author.npub, 20)}</span>
          <span> {reaction.content === '+' ? '👍' : reaction.content}</span>
        </p>
      </div>
    </Link>
  );
});
