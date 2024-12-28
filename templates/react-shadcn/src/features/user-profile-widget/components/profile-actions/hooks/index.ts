import { useActiveUser } from 'nostr-hooks';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'usehooks-ts';

export const useProfileActions = () => {
  const navigate = useNavigate();

  const { activeUser } = useActiveUser();

  const [, copy] = useCopyToClipboard();

  return {
    navigate,
    copy,
    activeUser,
  };
};
