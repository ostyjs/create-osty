import { NDKEvent } from '@nostr-dev-kit/ndk';
import { useNdk } from 'nostr-hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleWidget } from '@/features/article-widget';
import { Spinner } from '@/shared/components/spinner';

export const ArticlePage = () => {
  const { naddr } = useParams();
  const { ndk } = useNdk();
  const [event, setEvent] = useState<NDKEvent | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ndk || !naddr) return;
    setLoading(true);
    ndk
      .fetchEvent(naddr)
      .then((evt) => setEvent(evt))
      .finally(() => setLoading(false));
  }, [ndk, naddr]);

  if (loading) return <Spinner />;
  if (!event) return <div className="p-4">Article not found.</div>;

  return (
    <div className="flex flex-col items-center h-full w-full overflow-y-auto">
      <div className="w-full mx-auto">
        <ArticleWidget event={event} full={true} />
      </div>
    </div>
  );
};
