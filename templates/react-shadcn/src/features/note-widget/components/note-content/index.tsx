import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { decode } from 'nostr-tools/nip19';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { NoteByNoteId } from '@/features/note-widget';
import { ellipsis } from '@/shared/utils';

type NostrTypes = 'nprofile' | 'nevent' | 'naddr' | 'nsec' | 'npub' | 'note';

type Chunk = {
  type: 'text' | 'image' | 'video' | 'youtube' | 'url' | NostrTypes;
  content: string;
};

const parseChunks = (content: string): Chunk[] => {
  const chunks: Chunk[] = [];
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/g;
  const videoRegex = /(https?:\/\/.*\.(?:mp4|webm))/g;
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
  const nostrRegex = /(nostr:n[a-zA-Z0-9]+)/g;

  // Store all matches with their positions
  const matches: { type: Chunk['type']; content: string; index: number; fullLength: number }[] = [];

  // Find all matches
  let match: RegExpExecArray | null;
  while ((match = imageRegex.exec(content)) !== null) {
    matches.push({
      type: 'image',
      content: match[0],
      index: match.index,
      fullLength: match[0].length,
    });
  }
  while ((match = videoRegex.exec(content)) !== null) {
    matches.push({
      type: 'video',
      content: match[0],
      index: match.index,
      fullLength: match[0].length,
    });
  }
  while ((match = youtubeRegex.exec(content)) !== null) {
    matches.push({
      type: 'youtube',
      content: match[1],
      index: match.index,
      fullLength: match[0].length,
    });
  }
  while ((match = nostrRegex.exec(content)) !== null) {
    const decoded = decode(match[0].substring(6));
    switch (decoded.type) {
      case 'naddr':
      case 'nevent':
        matches.push({
          type: decoded.type,
          content: match[0].substring(6),
          index: match.index,
          fullLength: match[0].length,
        });
        break;
      case 'npub':
      case 'note':
        matches.push({
          type: decoded.type,
          content: decoded.data,
          index: match.index,
          fullLength: match[0].length,
        });
        break;
      case 'nprofile':
        matches.push({
          type: 'nprofile',
          content: decoded.data.pubkey,
          index: match.index,
          fullLength: match[0].length,
        });
        break;
    }
  }
  while ((match = urlRegex.exec(content)) !== null) {
    // Only add URLs that haven't been matched by other patterns
    if (!matches.some((m) => m.index === match?.index)) {
      matches.push({
        type: 'url',
        content: match[0],
        index: match.index,
        fullLength: match[0].length,
      });
    }
  }

  // Sort matches by their index
  matches.sort((a, b) => a.index - b.index);

  // Process the content with matches
  let lastIndex = 0;
  for (const match of matches) {
    // Add text chunk before the match if there is any
    if (match.index > lastIndex) {
      chunks.push({
        type: 'text',
        content: content.slice(lastIndex, match.index),
      });
    }

    // Add the match chunk
    chunks.push({
      type: match.type,
      content: match.content,
    });

    // Use fullLength for lastIndex update to properly handle nostr: prefix
    lastIndex = match.index + match.fullLength;
  }

  // Add remaining text after last match if any
  if (lastIndex < content.length) {
    chunks.push({
      type: 'text',
      content: content.slice(lastIndex),
    });
  }

  return chunks;
};

export const NoteContent = ({ event }: { event: NDKEvent }) => {
  const [chunks, setChunks] = useState<Chunk[]>([]);

  useEffect(() => {
    setChunks(parseChunks(event.content));
  }, [event.content]);

  return (
    <div className="pb-2">
      {chunks.map((chunk, index) => {
        switch (chunk.type) {
          case 'text':
            return (
              <span key={index} className="[overflow-wrap:anywhere]">
                {chunk.content}
              </span>
            );
          case 'image':
            return <img key={index} src={chunk.content} alt="Image" className="w-full" />;
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
                frameBorder="0"
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
            return <ProfileMention key={index} pubkey={chunk.content} />;
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
