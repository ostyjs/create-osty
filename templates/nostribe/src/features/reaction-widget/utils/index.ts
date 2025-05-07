import { ReactionEvent } from '../types';

export const isCustomEmoji = (content: string): boolean => {
  return content.startsWith(':') && content.endsWith(':');
};

export const getCustomEmojiShortcode = (content: string): string | null => {
  if (!isCustomEmoji(content)) return null;
  return content.slice(1, -1);
};

export const getCustomEmojiUrl = (event: ReactionEvent, shortcode: string): string | null => {
  const emojiTag = event.tags.find((tag) => tag[0] === 'emoji' && tag[1] === shortcode);
  return emojiTag ? emojiTag[2] : null;
};

export const normalizeReactionContent = (content: string): string => {
  if (!content) return '+';
  return content;
};
