import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  trigger: React.ReactNode;
}

export const EmojiPickerComponent = ({ onEmojiSelect, trigger }: EmojiPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="p-0">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  );
};
