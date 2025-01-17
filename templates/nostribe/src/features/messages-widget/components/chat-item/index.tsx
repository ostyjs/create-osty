import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk } from 'nostr-hooks';
import { memo, useEffect, useState } from 'react';

import { cn } from '@/shared/utils';

export const ChatItem = memo(
  ({ chat, targetUser }: { chat: NDKEvent; targetUser: NDKUser }) => {
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
      _chat.decrypt(targetUser).then(() => {
        setDecryptedContent(_chat.content);
      });
    }, [ndk, chat, setDecryptedContent, targetUser]);

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
              'p-2 rounded-lg max-w-[80%]',
              chat.pubkey === activeUser?.pubkey
                ? 'bg-purple-500/20 text-primary'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            <p className="[overflow-wrap:anywhere]">{decryptedContent}</p>
          </div>
        </div>
      </>
    );
  },
  (prev, next) =>
    prev.chat.id === next.chat.id && prev.targetUser.pubkey === next.targetUser.pubkey,
);
