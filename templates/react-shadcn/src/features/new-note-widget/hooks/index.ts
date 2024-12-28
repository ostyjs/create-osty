import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk, useRealtimeProfile } from 'nostr-hooks';
import { useCallback, useState } from 'react';

import { useToast } from '@/shared/components/ui/use-toast';

export const useNewNoteWidget = ({
  replyingToEvent,
}: {
  replyingToEvent?: NDKEvent | undefined;
}) => {
  const [content, setContent] = useState<string>('');

  const { activeUser } = useActiveUser();
  const { profile } = useRealtimeProfile(activeUser?.pubkey);

  const { ndk } = useNdk();

  const { toast } = useToast();

  const post = useCallback(() => {
    if (!ndk || !ndk.signer) {
      return;
    }

    const e = new NDKEvent(ndk);
    e.kind = 1;
    e.content = content;

    if (replyingToEvent) {
      const rootTag = replyingToEvent.tags.find((tag) => tag.length > 3 && tag[3] === 'root');

      if (rootTag) {
        e.tags.push(['e', rootTag[1], '', 'root']);
        e.tags.push(['e', replyingToEvent.id, '', 'reply']);
      } else {
        e.tags.push(['e', replyingToEvent.id, '', 'root']);
      }
    }

    e.publish()
      .then((relaySet) => {
        if (relaySet.size === 0) {
          toast({
            title: 'Error',
            description: 'Failed to post note',
            variant: 'destructive',
          });
        }
      })
      .catch((_) => {
        toast({
          title: 'Error',
          description: 'Failed to post note',
          variant: 'destructive',
        });
      });
  }, [ndk, content, replyingToEvent, toast]);

  return { content, setContent, post, profile };
};
