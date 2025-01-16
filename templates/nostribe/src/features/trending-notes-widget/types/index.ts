export type TrendingNote = {
  id: string;
  pubkey: string;
  relays: string[];
  event: {
    id: string;
    pubkey: string;
    kind: number;
    created_at: number;
    sig: string;
    content: string;
    tags: string[][];
  };
  author: {
    id: string;
    pubkey: string;
    kind: number;
    created_at: number;
    sig: string;
    content: string;
    tags: string[][];
  };
};

export type TrendingNotesResponse =
  | {
      notes: TrendingNote[];
    }
  | {
      error: string;
    };
