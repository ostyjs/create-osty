import { NDKEvent } from '@nostr-dev-kit/ndk';

export interface ReactionEvent extends NDKEvent {
  kind: 7;
  content: string;
  tags: string[][];
}

export interface CustomEmoji {
  shortcode: string;
  imageUrl: string;
}

export interface ReactionCount {
  [key: string]: number;
}
