import { NDKUser } from '@nostr-dev-kit/ndk';
import { EllipsisIcon, KeyRoundIcon, LinkIcon, MailIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { EditProfileBtn } from '../edit-profile-btn';
import { FollowUnfollowBtn } from '../follow-unfollow-btn';

import { useProfileActions } from './hooks';

export const ProfileActions = ({
  targetUser,
  setEditMode,
}: {
  targetUser: NDKUser;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { activeUser, copy, navigate } = useProfileActions();

  return (
    <>
      <div className="p-4 flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="rounded-full" size="icon">
              <EllipsisIcon size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem onClick={() => copy(window.location.href)}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy user link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => copy(targetUser.npub)}>
              <KeyRoundIcon className="w-4 h-4 mr-2" />
              Copy user public key
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="secondary"
          className="rounded-full"
          size="icon"
          onClick={() => navigate(`/messages/${targetUser.npub}`)}
        >
          <MailIcon size={18} />
        </Button>

        {activeUser && <FollowUnfollowBtn activeUser={activeUser} targetUser={targetUser} />}

        {activeUser && activeUser.pubkey === targetUser.pubkey && (
          <EditProfileBtn setEditMode={setEditMode} />
        )}
      </div>
    </>
  );
};
