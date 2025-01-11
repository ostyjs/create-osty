import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';

import { cn } from '@/shared/utils';

export const ChatItem = memo(
  ({ chat }: { chat: NDKEvent }) => {
    const [decryptedContent, setDecryptedContent] = useState<string>('');

    const { activeUser } = useActiveUser();
    const { ndk } = useNdk();

    useEffect(() => {
      if (!ndk || !ndk.signer) {
        return;
      }

      if (!chat.author || !chat.content) {
        return;
      }

      const _chat = new NDKEvent(ndk, chat.rawEvent());
      _chat.decrypt().then(() => {
        setDecryptedContent(_chat.content);
      });
    }, [ndk, chat, setDecryptedContent]);

    return (
      <>
        <div
          className={cn(
            'flex gap-2',
            chat.pubkey === activeUser?.pubkey ? 'justify-end' : 'justify-start',
          )}
        >
          <div
            className={cn(
              'p-2 rounded-lg',
              chat.pubkey === activeUser?.pubkey
                ? 'bg-purple-500/20 text-primary'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            <p>{decryptedContent}</p>
          </div>
        </div>
      </>
    );
  },
  (prev, next) => prev.chat.id === next.chat.id,
);
