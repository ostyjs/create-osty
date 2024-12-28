import { NDKEvent } from '@nostr-dev-kit/ndk';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

import { useNewNoteWidget } from './hooks';

export const NewNoteWidget = ({ replyingToEvent }: { replyingToEvent?: NDKEvent | undefined }) => {
  const { content, post, setContent, profile } = useNewNoteWidget({ replyingToEvent });

  return (
    <>
      <div className="p-2 bg-muted flex flex-col gap-2">
        <div className="flex gap-2">
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
          <Button className="px-8" onClick={post}>
            Post
          </Button>
        </div>
      </div>
    </>
  );
};
