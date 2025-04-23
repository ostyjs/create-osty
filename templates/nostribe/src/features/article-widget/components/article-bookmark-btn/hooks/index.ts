import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNdk, useSubscription } from 'nostr-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useArticleBookmarkBtn = (event: NDKEvent | undefined) => {
  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();
  const subId = activeUser && event ? `article-bookmarks-${event.id}` : undefined;
  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      event &&
      createSubscription({
        filters: [{ kinds: [NDKKind.BookmarkList], authors: [activeUser.pubkey], limit: 1 }],
        opts: { groupableDelay: 500 },
      });
  }, [createSubscription, activeUser, event]);

  const isBookmarkedByMe = useMemo(
    () =>
      events?.some((bookmarkList) =>
        bookmarkList.tags.some((tag) => tag[0] === 'a' && tag[1] === event?.tagAddress()),
      ) || false,
    [events, event],
  );

  const bookmark = useCallback(() => {
    if (!event || !ndk || isBookmarkedByMe) return;
    const bookmarkList = events?.[0];
    const e = new NDKEvent(ndk);
    e.kind = NDKKind.BookmarkList;
    e.tags = [...(bookmarkList?.tags || [])];
    e.tags.push(['a', event.tagAddress()]);
    e.publish();
  }, [ndk, event, isBookmarkedByMe, events]);

  const unbookmark = useCallback(() => {
    if (!event || !ndk || !isBookmarkedByMe) return;
    const bookmarkList = events?.[0];
    const e = new NDKEvent(ndk);
    e.kind = NDKKind.BookmarkList;
    e.tags = (bookmarkList?.tags || []).filter(
      (t) => !(t[0] === 'a' && t[1] === event.tagAddress()),
    );
    e.publish();
  }, [ndk, event, isBookmarkedByMe, events]);

  return { isBookmarkedByMe, bookmark, unbookmark };
};
