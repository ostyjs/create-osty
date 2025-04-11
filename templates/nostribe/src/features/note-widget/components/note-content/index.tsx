import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { EventPointer, neventEncode } from 'nostr-tools/nip19';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ellipsis } from '@/shared/utils';
import { NoteByNoteId } from '../note-by-note-id';

import { useNoteContent } from './hooks';

const ProfileMention = memo(
  ({ pubkey }: { pubkey: string }) => {
    const npub = useMemo(() => {
      return new NDKUser({ pubkey }).npub;
    }, [pubkey]);

    const { profile } = useRealtimeProfile(pubkey);

    return (
      <Link to={`/profile/${npub}`} className="text-purple-700 hover:underline">
        @{profile?.name || ellipsis(npub || '', 10)}
      </Link>
    );
  },
  (prev, next) => prev.pubkey === next.pubkey,
);

export const NoteContent = memo(
  ({ event }: { event: NDKEvent }) => {
    const { chunks, inView, ref } = useNoteContent(event.content);

    return (
      <div ref={ref} className="flex flex-col gap-4">
        <div className="prose dark:prose-invert max-w-none">
          {chunks.map((chunk, index) => {
            switch (chunk.type) {
              case 'text':
              case 'naddr':
                return (
                  <span key={index} className="[overflow-wrap:anywhere]">
                    {chunk.content}
                  </span>
                );
              case 'image':
                return (
                  <img
                    key={index}
                    src={chunk.content}
                    alt="Image"
                    loading="lazy"
                    className="w-full rounded-sm"
                  />
                );
              case 'video':
                return <video key={index} src={chunk.content} controls className="w-full" />;
              case 'youtube':
                return (
                  <iframe
                    key={index}
                    src={`https://www.youtube.com/embed/${chunk.content}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  />
                );
              case 'url':
                return (
                  <a
                    key={index}
                    href={chunk.content}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 hover:underline [overflow-wrap:anywhere]"
                  >
                    {chunk.content}
                  </a>
                );
              case 'nevent':
                if (!inView) {
                  return null;
                }

                const parsedEvent = JSON.parse(chunk.content) as EventPointer;
                if (parsedEvent.kind === 1) {
                  return (
                    <div className="-mx-2 py-2">
                      <NoteByNoteId key={index} noteId={parsedEvent.id} />
                    </div>
                  );
                } else {
                  return (
                    <span key={index} className="[overflow-wrap:anywhere]">
                      {`nostr:${neventEncode(parsedEvent)}`}
                    </span>
                  );
                }
              case 'note':
                if (inView) {
                  return (
                    <div className="-mx-2 py-2">
                      <NoteByNoteId key={index} noteId={chunk.content} />
                    </div>
                  );
                } else {
                  return null;
                }
              case 'nprofile':
              case 'npub':
                if (inView) {
                  return <ProfileMention key={index} pubkey={chunk.content} />;
                } else {
                  return null;
                }
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  },
  (prev, next) => prev.event.id === next.event.id,
);
