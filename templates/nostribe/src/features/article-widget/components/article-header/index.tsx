import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { NDKEvent, NDKUser } from '@nostr-dev-kit/ndk';
import {
  EllipsisIcon,
  FileJsonIcon,
  LinkIcon,
  SquareArrowOutUpRight,
  TagIcon,
  TextIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { useArticleHeader } from './hooks';

export const ArticleHeader = ({ event, full = false }: { event: NDKEvent; full?: boolean }) => {
  const { profile, copy, navigate, naddr, ref } = useArticleHeader(event);
  const npub = new NDKUser({ pubkey: event.pubkey }).npub;

  // TODO: remove this
  console.log(full);

  return (
    <div className="flex items-center justify-between gap-2 mb-1 w-full" ref={ref}>
      <div className="flex items-center gap-2 min-w-0 w-full">
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
        <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
          {new Date((event.created_at || 0) * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="opacity-60 hover:opacity-100">
            <EllipsisIcon size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuItem onClick={() => navigate(`/a/${naddr}`)}>
            <SquareArrowOutUpRight className="w-4 h-4 mr-2" />
            Open
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => copy(`${window.location.origin}/a/${naddr}`)}>
            <LinkIcon className="w-4 h-4 mr-2" />
            Copy article link
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => copy(event.content)}>
            <TextIcon className="w-4 h-4 mr-2" />
            Copy article text
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => copy(naddr)}>
            <TagIcon className="w-4 h-4 mr-2" />
            Copy article ID
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => copy(JSON.stringify(event.rawEvent()))}>
            <FileJsonIcon className="w-4 h-4 mr-2" />
            Copy raw data
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
