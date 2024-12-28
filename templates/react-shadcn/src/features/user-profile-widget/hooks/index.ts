import { NDKUser } from '@nostr-dev-kit/ndk';
import { useProfile } from 'nostr-hooks';
import { useState } from 'react';

import { ProfileView } from '../types';

export const useUserProfileWidget = ({
  user,
  initialEditMode = false,
}: {
  user: NDKUser;
  initialEditMode?: boolean;
}) => {
  const [view, setView] = useState<ProfileView>('notes');
  const [editMode, setEditMode] = useState(initialEditMode);

  const { profile } = useProfile({ pubkey: user.pubkey });

  return { profile, view, setView, editMode, setEditMode };
};
