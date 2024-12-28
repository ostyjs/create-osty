import { NDKEvent } from '@nostr-dev-kit/ndk';
import { CornerDownRightIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

import { cn } from '@/shared/utils';

import { useNewNoteWidget } from './hooks';

export const NewNoteWidget = ({ replyingToEvent }: { replyingToEvent?: NDKEvent | undefined }) => {
  const { content, post, setContent, profile } = useNewNoteWidget({ replyingToEvent });

  return (
    <>
      <div className={cn('p-2 bg-muted flex flex-col gap-2', replyingToEvent && '-mx-2 pl-6')}>
        <div className="flex gap-2">
          {replyingToEvent && (
            <div className="pt-2 opacity-50">
              <CornerDownRightIcon size={18} />
            </div>
          )}

          <Avatar>
            <AvatarImage src={profile?.image} alt={profile?.name} />
            <AvatarFallback className="bg-muted" />
          </Avatar>

          <Textarea
            className="bg-background"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="w-full flex gap-2 justify-end">
          <Button className="px-8" size="sm" onClick={post}>
            Post
          </Button>
        </div>
      </div>
    </>
  );
};
