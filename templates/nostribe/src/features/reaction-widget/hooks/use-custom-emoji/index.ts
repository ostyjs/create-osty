import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useMemo } from 'react';
import { CustomEmoji } from '../../types';

export const useCustomEmoji = (event: NDKEvent) => {
  const subId = event ? `custom-emoji-${event.pubkey}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useMemo(() => {
    event &&
      createSubscription({
        filters: [
          {
            kinds: [30030],
            authors: [event.pubkey],
          },
        ],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, event]);

  const customEmojis = useMemo(() => {
    if (!events) return [];
    return events
      .filter((emojiEvent) => emojiEvent.kind === 30030)
      .map((emojiEvent) => {
        const shortcode = emojiEvent.tags.find((tag) => tag[0] === 'd')?.[1];
        const imageUrl = emojiEvent.tags.find((tag) => tag[0] === 'url')?.[1];
        if (shortcode && imageUrl) {
          return { shortcode, imageUrl };
        }
        return null;
      })
      .filter((e): e is CustomEmoji => !!e);
  }, [events]);

  return { customEmojis };
};
