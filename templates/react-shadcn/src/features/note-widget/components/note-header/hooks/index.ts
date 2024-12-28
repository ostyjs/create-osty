import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useProfile } from 'nostr-hooks';
import { neventEncode } from 'nostr-tools/nip19';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

export const useNoteHeader = (event: NDKEvent) => {
  const [, copy] = useCopyToClipboard();

  const { profile } = useProfile({ pubkey: event.pubkey });

  const navigate = useNavigate();

  const nevent = useMemo(
    () =>
      neventEncode({
        id: event.id,
        author: event.author.pubkey,
        kind: event.kind,
        relays: event.onRelays.map((relay) => relay.url),
      }),
    [event],
  );

  return {
    profile,
    copy,
    navigate,
    nevent,
  };
};
