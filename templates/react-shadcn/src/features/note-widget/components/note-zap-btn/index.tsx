import { NDKEvent } from '@nostr-dev-kit/ndk';
import { ZapIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

import { cn } from '@/shared/utils';

import { ZapWidget } from '@/features/zap-widget';

import { useNoteZapBtn } from './hooks';

export const NoteZapBtn = ({ event }: { event: NDKEvent }) => {
  const { totalAmount, isZapedByMe } = useNoteZapBtn(event);

  return (
    <>
      <ZapWidget target={event}>
        <Button
          variant="link"
          size="icon"
          className={cn(isZapedByMe ? 'text-orange-600' : 'opacity-50 hover:opacity-100')}
        >
          <ZapIcon size={18} />

          <span className="ml-1 text-xs">{totalAmount < 1000 ? totalAmount : '1K+'}</span>
        </Button>
      </ZapWidget>
    </>
  );
};
