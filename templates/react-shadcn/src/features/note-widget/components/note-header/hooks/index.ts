import { useProfile } from 'nostr-hooks';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

export const useNoteHeader = (pubkey: string) => {
  const [, copy] = useCopyToClipboard();

  const { profile } = useProfile({ pubkey });

  const navigate = useNavigate();

  return {
    profile,
    copy,
    navigate,
  };
};
