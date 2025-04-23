import { NDKEvent } from '@nostr-dev-kit/ndk';
import { memo, useState } from 'react';

import { ArticleBookmarkBtn } from '../article-bookmark-btn';
import { ArticleCommentBtn } from '../article-comment-btn';
import { ArticleLikeBtn } from '../article-like-btn';
import { ArticleRepostBtn } from '../article-repost-btn';
import { ArticleZapBtn } from '../article-zap-btn';

export const ArticleFooter = memo(
  ({ event }: { event: NDKEvent }) => {
    const [showingComments, setShowingComments] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <ArticleCommentBtn event={event} onClick={() => setShowingComments(!showingComments)} />
          <ArticleZapBtn event={event} />
          <ArticleLikeBtn event={event} />
          <ArticleRepostBtn event={event} />
          <ArticleBookmarkBtn event={event} />
        </div>
      </div>
    );
  },
  (prev, next) => prev.event.id === next.event.id,
);
