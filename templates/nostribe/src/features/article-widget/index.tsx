import { NDKEvent } from '@nostr-dev-kit/ndk';
import { ArticleContent } from './components/article-content';
import { ArticleFooter } from './components/article-footer';
import { ArticleHeader } from './components/article-header';

export const ArticleWidget = ({ event, full = false }: { event: NDKEvent; full?: boolean }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b p-4">
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <ArticleHeader event={event} full={full} />
        <ArticleContent event={event} full={full} />
        <ArticleFooter event={event} full={full} />
      </div>
    </div>
  );
};
