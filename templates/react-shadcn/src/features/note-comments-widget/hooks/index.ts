import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useSubscription } from 'nostr-hooks';
import { useEffect, useMemo } from 'react';

export const useNoteCommentsWidget = (event: NDKEvent) => {
  const rootEventId = useMemo(() => {
    const rootTags = event
      .getMatchingTags('e')
      .filter((tag) => tag.length > 2 && tag[3] === 'root');

    if (rootTags.length === 0) {
      return event.id;
    }

    if (rootTags[0].length < 2) {
      return event.id;
    }

    return rootTags[0][1];
  }, [event]);

  const subId = `note-comments-${rootEventId}`;

  const { createSubscription, events, loadMore, hasMore, isLoading } = useSubscription(subId);

  const processedEvents = useMemo(
    () =>
      events
        ?.filter((e) => {
          const eTags = e.getMatchingTags('e');
          if (eTags.length === 0) {
            return false;
          }

          if (event.id === rootEventId) {
            return (
              eTags.some((eTag) => eTag.length > 3 && eTag[1] === event.id && eTag[3] === 'root') &&
              !eTags.some((eTag) => eTag.length > 3 && eTag[3] === 'reply')
            );
          } else {
            return (
              eTags.some(
                (eTag) => eTag.length > 3 && eTag[1] === event.id && eTag[3] === 'reply',
              ) &&
              eTags.some((eTag) => eTag.length > 3 && eTag[1] === rootEventId && eTag[3] === 'root')
            );
          }
        })
        .reverse(),
    [events, event, rootEventId],
  );

  useEffect(() => {
    createSubscription({
      filters: [{ kinds: [1], '#e': [rootEventId], limit: 10 }],
      opts: { groupableDelay: 500 },
    });
  }, [createSubscription]);

  return {
    processedEvents,
    loadMore,
    hasMore,
    isLoading,
  };
};
