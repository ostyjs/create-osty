import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { useState } from 'react';

interface CustomEmojiProps {
  onCustomEmojiAdd: (shortcode: string, imageUrl: string) => void;
}

export const CustomEmojiComponent = ({ onCustomEmojiAdd }: CustomEmojiProps) => {
  const [shortcode, setShortcode] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    if (shortcode && imageUrl) {
      onCustomEmojiAdd(shortcode, imageUrl);
      setShortcode('');
      setImageUrl('');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="space-y-2">
        <Label htmlFor="shortcode">Shortcode</Label>
        <Input
          id="shortcode"
          placeholder="e.g., awesome"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          placeholder="https://example.com/emoji.png"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>Add Custom Emoji</Button>
    </div>
  );
};
