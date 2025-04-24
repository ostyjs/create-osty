import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import { EllipsisIcon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';
import { Link } from 'react-router-dom';

export const ArticleHeader = ({ event, full = false }: { event: NDKEvent; full?: boolean }) => {
  const { profile } = useRealtimeProfile(event.pubkey);
  const npub = new NDKUser({ pubkey: event.pubkey }).npub;

  // TODO: remove this
  console.log(full);

  return (
    <div className="flex items-center justify-between gap-2 mb-1 w-full">
      <div className="flex items-center gap-2 min-w-0">
        <Link to={`/profile/${npub}`} className="flex items-center gap-2 min-w-0 group">
          <Avatar className="w-8 h-8">
            <AvatarImage src={profile?.image} alt={profile?.name} className="object-cover" />
            <AvatarFallback />
          </Avatar>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate group-hover:underline">
              {profile?.name || 'Unknown'}
            </div>
            <div className="text-xs text-muted-foreground truncate group-hover:underline">
              {profile?.nip05 || event.pubkey.slice(0, 12)}
            </div>
          </div>
        </Link>
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
