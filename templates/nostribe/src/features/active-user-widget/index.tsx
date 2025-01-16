import { PowerIcon, UserIcon } from 'lucide-react';
import { useActiveUser, useLogin, useRealtimeProfile } from 'nostr-hooks';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { ellipsis } from '@/shared/utils';

export const ActiveUserWidget = () => {
  const { activeUser } = useActiveUser();
  const { profile } = useRealtimeProfile(activeUser?.pubkey);
  const { logout } = useLogin();

  const navigate = useNavigate();

  if (!activeUser) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer bg-secondary rounded-full xl:pl-1 xl:pr-2 xl:py-1">
          <Avatar>
            <AvatarImage src={profile?.image} alt={profile?.name} className="object-cover" />
            <AvatarFallback className="bg-background/50" />
          </Avatar>

          <div className="text-start pr-2 hidden xl:block">
            {profile?.name && <div className="text-sm">{profile.name}</div>}
            <div className="text-xs text-primary/70">
              {profile?.nip05 || ellipsis(activeUser.npub, 10)}
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem onClick={() => navigate(`/profile/${activeUser.npub}`)}>
          <UserIcon className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <PowerIcon className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
