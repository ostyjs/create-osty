import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useNoteBookmarkBtn = (event: NDKEvent) => {
  const { ndk } = useNdk();

  const { myBookmarkList } = useMyBookmarkList();

  const isBookmarkedByMe = useMemo(
    () => myBookmarkList?.getMatchingTags('e')?.some((e) => e.length > 1 && e[1] === event.id),
    [myBookmarkList, event],
  );

  const bookmark = useCallback(() => {
    if (!ndk) {
      return;
    }

    if (isBookmarkedByMe) {
      return;
    }

    const e = new NDKEvent(ndk);
    e.kind = NDKKind.BookmarkList;
    e.tags = [...(myBookmarkList?.tags || [])];
    e.tags.push(['e', event.id]);
    e.publish();
  }, [ndk, event, isBookmarkedByMe, myBookmarkList]);

  const unbookmark = useCallback(() => {
    if (!ndk) {
      return;
    }

    if (!isBookmarkedByMe) {
      return;
    }

    const e = new NDKEvent(ndk);
    e.kind = NDKKind.BookmarkList;
    e.tags = myBookmarkList?.tags.filter((t) => t[1] !== event.id) || [];
    e.publish();
  }, [ndk, event, isBookmarkedByMe, myBookmarkList]);

  return { isBookmarkedByMe, bookmark, unbookmark };
};

const useMyBookmarkList = () => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `my-bookmark-list` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  const myBookmarkList = useMemo(
    () => (events && events.length > 0 ? events[events.length - 1] : undefined),
    [events],
  );

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [{ kinds: [NDKKind.BookmarkList], authors: [activeUser.pubkey], limit: 1 }],
      });
  }, [createSubscription]);

  return { myBookmarkList };
};
