import { NDKEvent, NDKUser, zapInvoiceFromEvent } from '@nostr-dev-kit/ndk';
import { ZapIcon } from 'lucide-react';
import { useRealtimeProfile } from 'nostr-hooks';
import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/shared/components/ui/avatar';

import { Spinner } from '@/shared/components/spinner';

import { ellipsis } from '@/shared/utils';

import { NoteByNoteId } from '@/features/note-widget';

type CategorizedZaps = Map<string, NDKEvent[]>;

export const Zaps = memo(({ zaps }: { zaps: NDKEvent[] | undefined }) => {
  const categorizedZaps: CategorizedZaps = useMemo(() => {
    const categorizedZaps = new Map<string, NDKEvent[]>();

    zaps?.forEach((zap) => {
      const eTags = zap.getMatchingTags('e');
      if (eTags.length > 0) {
        const eTag = eTags[eTags.length - 1];
        if (eTag.length > 0) {
          const eventId = eTag[1];
          const zaps = categorizedZaps.get(eventId) || [];
          zaps.push(zap);
          categorizedZaps.set(eventId, zaps);
        }
      }
    });

    return categorizedZaps;
  }, [zaps]);

  if (zaps === undefined) {
    return <Spinner />;
  }

  if (zaps.length === 0) {
    return <div>No zaps yet</div>;
  }

  return (
    <>
      {Array.from(categorizedZaps.keys()).map((eventId) => (
        <div key={eventId} className="px-2 pb-2">
          <div className="border rounded-sm shadow-md bg-background transition-colors duration-500 ease-out hover:border-primary/30">
            <div className="flex flex-wrap items-center gap-2 px-2 py-2">
              <ZapIcon size={18} />

              {categorizedZaps.get(eventId)?.map((zap) => <Zap key={zap.id} zap={zap} />)}
            </div>

            <div className="pb-2">
              <NoteByNoteId noteId={eventId} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

const Zap = memo(
  ({ zap }: { zap: NDKEvent }) => {
    const invoice = zapInvoiceFromEvent(zap);
    const { profile } = useRealtimeProfile(invoice?.zappee);
    const npub = useMemo(
      () => (invoice && invoice.zapper ? new NDKUser({ pubkey: invoice.zapper }).npub : ''),
      [invoice?.zapper],
    );

    return (
      <Link to={`/profile/${npub}`}>
        <div className="flex gap-1 items-center">
          <Avatar className="bg-secondary w-5 h-5">
            <AvatarImage src={profile?.image} className="bg-secondary" />
          </Avatar>

          <p className="text-xs font-light">
            <span className="font-bold"> {(invoice?.amount || 0) / 1000} sats</span>
            <span> from {ellipsis(profile?.name ? profile.name.toString() : npub, 20)}</span>
          </p>
        </div>
      </Link>
    );
  },
  (prevProps, nextProps) => prevProps.zap.id === nextProps.zap.id,
);
