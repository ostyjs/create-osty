import { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ellipsis } from '@/shared/utils';

export const NoteParentPreview = ({ event }: { event: NDKEvent }) => {
  const navigate = useNavigate();

  const [replyEvent, setReplyEvent] = useState<NDKEvent | null | undefined>(undefined);
  const [rootEvent, setRootEvent] = useState<NDKEvent | null | undefined>(undefined);

  const [replyAuthorProfile, setReplyAuthorProfile] = useState<NDKUserProfile | null | undefined>(
    undefined,
  );
  const [rootAuthorProfile, setRootAuthorProfile] = useState<NDKUserProfile | null | undefined>(
    undefined,
  );

  useEffect(() => {
    event.fetchReplyEvent().then((replyEvent) => {
      setReplyEvent(replyEvent);
    });

    event.fetchRootEvent().then((rootEvent) => {
      setRootEvent(rootEvent);
    });
  }, [event, setReplyEvent, setRootEvent]);

  useEffect(() => {
    !replyAuthorProfile &&
      replyEvent?.author.fetchProfile().then((profile) => {
        setReplyAuthorProfile(profile);
      });

    !rootAuthorProfile &&
      rootEvent?.author.fetchProfile().then((profile) => {
        setRootAuthorProfile(profile);
      });
  }, [
    replyEvent,
    rootEvent,
    replyAuthorProfile,
    rootAuthorProfile,
    setReplyAuthorProfile,
    setRootAuthorProfile,
  ]);

  if (!replyEvent && !rootEvent) {
    return null;
  }

  return (
    <>
      <div className="pb-2">
        <p className="text-xs">
          <span>replying to </span>
          <button
            className="text-xs text-blue-600 hover:underline"
            onClick={() =>
              navigate(`/profile/${replyEvent?.author.npub || rootEvent?.author.npub}`)
            }
          >
            {replyAuthorProfile?.name ||
              rootAuthorProfile?.name ||
              ellipsis(replyEvent?.author.npub || rootEvent?.author.npub || 'unknown', 10)}
          </button>
        </p>
      </div>
    </>
  );
};
