import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useState } from 'react';
import { normalizeReactionContent } from '../../utils';

export const useReaction = (event: NDKEvent) => {
  const [loading, setLoading] = useState(false);
  const { ndk } = useNdk();

  const sendReaction = async (content: string, customEmojiTags?: string[][]) => {
    if (!ndk) return;
    setLoading(true);

    try {
      const reactionEvent = new NDKEvent(ndk);
      reactionEvent.kind = 7;
      reactionEvent.content = normalizeReactionContent(content);
      reactionEvent.tags = [
        ['e', event.id],
        ['p', event.pubkey],
        ['k', (event.kind || 1).toString()],
        ...(customEmojiTags || []),
      ];

      await reactionEvent.publish();
    } catch (error) {
      console.error('Failed to send reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return { sendReaction, loading };
};
