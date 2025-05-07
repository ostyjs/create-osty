import { Button } from '@/shared/components/ui/button';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { Smile, Star } from 'lucide-react';
import React, { useState } from 'react';
import { CustomEmojiComponent } from './components/custom-emoji';
import { EmojiPickerComponent } from './components/emoji-picker';
import { ReactionList } from './components/reaction-list';
import { useReaction } from './hooks';

interface ReactionWidgetProps {
  event: NDKEvent;
}

export const ReactionWidget: React.FC<ReactionWidgetProps> = ({ event }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCustomEmoji, setShowCustomEmoji] = useState(false);
  const { sendReaction, loading } = useReaction(event);

  const handleEmojiSelect = async (emoji: string) => {
    await sendReaction(emoji);
    setShowEmojiPicker(false);
  };

  const handleCustomEmojiAdd = (shortcode: string, imageUrl: string) => {
    sendReaction(`:${shortcode}:`, [['emoji', shortcode, imageUrl]]);
    setShowCustomEmoji(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 w-full py-2">
        <div className="flex flex-row gap-1">
          <EmojiPickerComponent
            onEmojiSelect={handleEmojiSelect}
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 p-0"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                disabled={loading}
                aria-label="Add Reaction"
              >
                <Smile size={18} />
              </Button>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 p-0"
            onClick={() => setShowCustomEmoji(!showCustomEmoji)}
            disabled={loading}
            aria-label="Add Custom Emoji"
          >
            <Star size={18} />
          </Button>
        </div>
        <div className="flex-1">
          <ReactionList event={event} />
        </div>
      </div>

      {showCustomEmoji && <CustomEmojiComponent onCustomEmojiAdd={handleCustomEmojiAdd} />}
    </div>
  );
};
