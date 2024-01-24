import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk';
import NDKCacheAdapterDexie from '@nostr-dev-kit/ndk-cache-dexie';
import { create } from 'zustand';

type NostrState = {
  ndk: NDK;
  relays: string[];
};

type AppState = {};

type Actions = {
  setRelays: (relays: string[]) => void;
};

export const useLocalStore = create<NostrState & AppState & Actions>((set) => ({
  relays: ['wss://nos.lol'],
  ndk: new NDK({
    signer: new NDKNip07Signer(),
    cacheAdapter: new NDKCacheAdapterDexie({ dbName: 'osty-db' }),
    explicitRelayUrls: ['wss://nos.lol'],
    autoConnectUserRelays: false,
    autoFetchUserMutelist: false,
  }),
  setRelays: (relays) => set({ relays }),
}));
