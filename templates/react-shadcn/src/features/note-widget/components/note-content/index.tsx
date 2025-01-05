import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ellipsis } from '@/shared/utils';

import { NoteByNoteId } from '@/features/note-widget';

import { useNoteContent } from './hooks';

export const NoteContent = ({ event }: { event: NDKEvent }) => {
  const { chunks, inView, ref } = useNoteContent(event.content);

  return (
    <div className="pb-2" ref={ref}>
      {chunks.map((chunk, index) => {
        switch (chunk.type) {
          case 'text':
          case 'naddr':
          case 'nevent':
            return (
              <span key={index} className="[overflow-wrap:anywhere]">
                {chunk.content}
              </span>
            );
          case 'image':
            return (
              <img key={index} src={chunk.content} alt="Image" loading="lazy" className="w-full" />
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
          case 'note':
            return (
              <>
                <div className="p-4 bg-secondary/50">
                  <NoteByNoteId key={index} noteId={chunk.content} />
                </div>
              </>
            );
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
  );
};

const ProfileMention = ({ pubkey }: { pubkey: string }) => {
  const npub = useMemo(() => {
    return new NDKUser({ pubkey }).npub;
  }, [pubkey]);

  const { profile } = useRealtimeProfile(pubkey);

  return (
    <>
      <Link to={`/profile/${npub}`} className="text-purple-700 hover:underline">
        @{profile?.name || ellipsis(npub || '', 10)}
      </Link>
    </>
  );
};
