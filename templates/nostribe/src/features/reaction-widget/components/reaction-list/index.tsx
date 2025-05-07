import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
import React from 'react';
import { useRealtimeReactions } from '../../hooks/use-realtime-reactions';

interface ReactionListProps {
  event: NDKEvent;
}

// Helper to group reactions by emoji content
function groupReactionsByEmoji(reactions: NDKEvent[]) {
  const groups: Record<string, NDKEvent[]> = {};
  reactions.forEach((reaction) => {
    let content = reaction.content.trim();
    if (content === '' || content === '+') content = '👍';
    groups[content] = groups[content] || [];
    groups[content].push(reaction);
  });
  return groups;
}

const ProfileAvatar: React.FC<{ pubkey: string; index: number }> = ({ pubkey, index }) => {
  const { profile } = useRealtimeProfile(pubkey);
  const avatarUrl = profile?.image || '';
  return (
    <Avatar className={index === 0 ? 'w-6 h-6' : 'w-6 h-6 -ml-3'}>
      <AvatarImage src={avatarUrl} alt={typeof profile?.name === 'string' ? profile.name : ''} />
    </Avatar>
  );
};

export const ReactionList: React.FC<ReactionListProps> = ({ event }) => {
  const reactions = useRealtimeReactions(event);
  const grouped = groupReactionsByEmoji(Array.isArray(reactions) ? reactions : []);

  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto max-w-full">
      {Object.entries(grouped).map(([emoji, group], idx) => {
        // Get up to 3 unique pubkeys
        const uniquePubkeys = Array.from(new Set(group.map((r) => r.pubkey)));
        const shownPubkeys = uniquePubkeys.slice(0, 3);
        const extraCount = uniquePubkeys.length - shownPubkeys.length;
        // Custom emoji support
        let emojiDisplay: React.ReactNode = emoji;
        if (/^:.*:$/.test(emoji)) {
          // Find custom emoji url from tags
          const tag = group[0].tags.find((t) => t[0] === 'emoji' && `:${t[1]}:` === emoji);
          if (tag) {
            emojiDisplay = <img src={tag[2]} alt={emoji} className="inline w-6 h-6 align-middle" />;
          }
        }
        return (
          <div
            key={idx}
            className="flex items-center gap-1 border border-outline rounded-md px-2 py-1 bg-background"
            style={{ minWidth: 0 }}
          >
            <span className="text-xl flex items-center justify-center">{emojiDisplay}</span>
            <div className="flex items-center ml-2">
              {shownPubkeys.map((pubkey, i) => (
                <ProfileAvatar key={pubkey} pubkey={pubkey} index={i} />
              ))}
              {extraCount > 0 && (
                <span className="ml-1 text-xs bg-neutral-800 text-white rounded-full px-2 py-0.5">
                  {`${shownPubkeys.length}+`}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
