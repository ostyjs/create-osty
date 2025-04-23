import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { EllipsisIcon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';

export const ArticleHeader = ({ event }: { event: NDKEvent }) => {
  const { profile } = useRealtimeProfile(event.pubkey);
  return (
    <div className="flex items-center justify-between gap-2 mb-1 w-full">
      <div className="flex items-center gap-2 min-w-0">
        <Avatar className="w-8 h-8">
          <AvatarImage src={profile?.image} alt={profile?.name} className="object-cover" />
          <AvatarFallback />
        </Avatar>
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">{profile?.name || 'Unknown'}</div>
          <div className="text-xs text-muted-foreground truncate">
            {profile?.nip05 || event.pubkey.slice(0, 12)}
          </div>
        </div>
        <span className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
          {new Date((event.created_at || 0) * 1000).toLocaleDateString()}
        </span>
      </div>
      <Button variant="ghost" size="icon" className="opacity-60 hover:opacity-100">
        <EllipsisIcon size={18} />
      </Button>
    </div>
  );
};
