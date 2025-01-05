export type NostrTypes = 'nprofile' | 'nevent' | 'naddr' | 'nsec' | 'npub' | 'note';

export type Chunk = {
  type: 'text' | 'image' | 'video' | 'youtube' | 'url' | NostrTypes;
  content: string;
};
