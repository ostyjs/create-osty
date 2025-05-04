import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import { naddrEncode } from 'nostr-tools/nip19';
import { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

export const useArticleHeader = (event: NDKEvent) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [, copy] = useCopyToClipboard();

  const { profile } = useRealtimeProfile(inView ? event.pubkey : undefined);

  const navigate = useNavigate();

  const naddr = useMemo(
    () =>
      naddrEncode({
        kind: event.kind ?? 30023,
        pubkey: event.pubkey,
        identifier: event.tagValue('d') || '',
        relays: event.relay ? [event.relay.url] : [],
      }),
    [event],
  );

  return {
    ref,
    profile,
    copy,
    navigate,
    naddr,
  };
};
