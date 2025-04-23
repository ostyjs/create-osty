import { ZapWidget } from '@/features/zap-widget';
import { Button } from '@/shared/components/ui/button';
import { NDKEvent } from '@nostr-dev-kit/ndk';
import { ZapIcon } from 'lucide-react';
import { useArticleZapBtn } from './hooks';

export const ArticleZapBtn = ({ event }: { event: NDKEvent }) => {
  const { totalAmount } = useArticleZapBtn(event);

  return (
    <>
      <ZapWidget target={event}>
        <Button variant="link" className="px-0 opacity-50 hover:opacity-100">
          <div>
            <ZapIcon size={18} />
          </div>

          <span className="ml-1 text-xs">{totalAmount < 1000 ? totalAmount : '1K+'}</span>
        </Button>
      </ZapWidget>
    </>
  );
};
