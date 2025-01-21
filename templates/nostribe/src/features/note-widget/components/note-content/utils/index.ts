import { decode } from 'nostr-tools/nip19';

import { Chunk } from '../types';

export const parseChunks = (content: string): Chunk[] => {
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
    try {
      const decoded = decode(match[0].substring(6));
      switch (decoded.type) {
        case 'naddr':
          matches.push({
            type: decoded.type,
            content: match[0],
            index: match.index,
            fullLength: match[0].length,
          });
          break;
        case 'nevent':
          matches.push({
            type: decoded.type,
            content: JSON.stringify(decoded.data),
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
    } catch (_) {
      matches.push({
        type: 'text',
        content: match[0].substring(0, 100) + '...',
        index: match.index,
        fullLength: match[0].length,
      });
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
