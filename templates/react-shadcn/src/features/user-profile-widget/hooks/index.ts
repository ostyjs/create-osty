import { NDKUser } from '@nostr-dev-kit/ndk';
import { useRealtimeProfile } from 'nostr-hooks';
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

  const { profile } = useRealtimeProfile(user.pubkey);

  return { profile, view, setView, editMode, setEditMode };
};
