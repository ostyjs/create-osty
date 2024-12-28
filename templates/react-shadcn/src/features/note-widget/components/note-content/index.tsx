import { NDKEvent } from '@nostr-dev-kit/ndk';

export const NoteContent = ({ event }: { event: NDKEvent }) => {
  return (
    <div className="pb-2">
      <p className="[overflow-wrap:anywhere]">{event.content}</p>
    </div>
  );
};
