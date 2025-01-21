import { useActiveUser, useSubscription } from 'nostr-hooks';
import { memo, useEffect, useMemo } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

import { MentionsAndReplies, Reactions, Reposts, Zaps } from './components';

export const NotificationsWidget = memo(() => {
  const { activeUser } = useActiveUser();

  const subId = activeUser ? `notifications-${activeUser.pubkey}` : undefined;

  const { createSubscription, events } = useSubscription(subId);

  useEffect(() => {
    activeUser &&
      createSubscription({
        filters: [{ kinds: [1, 6, 7, 9735], '#p': [activeUser.pubkey], limit: 100 }],
      });
  }, [activeUser, createSubscription]);

  const mentionsAndReplies = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 1 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const reposts = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 6 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const reactions = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 7 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const zaps = useMemo(
    () =>
      events
        ?.filter((event) => event.kind === 9735 && event.pubkey !== activeUser?.pubkey)
        .sort((a, b) => b.created_at! - a.created_at!),
    [events, activeUser?.pubkey],
  );
  const all = useMemo(
    () =>
      [
        ...(mentionsAndReplies || []),
        ...(reposts || []),
        ...(reactions || []),
        ...(zaps || []),
      ].sort((a, b) => b.created_at! - a.created_at!),
    [mentionsAndReplies, reposts, reactions, zaps],
  );

  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mentions-replies">Mentions and Replies</TabsTrigger>
          <TabsTrigger value="reposts">Reposts</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
          <TabsTrigger value="zaps">Zaps</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {all?.map((event) => {
            switch (event.kind) {
              case 1:
                return <MentionsAndReplies key={event.id} mentionsAndReplies={[event]} />;
              case 6:
                return <Reposts key={event.id} reposts={[event]} />;
              case 7:
                return <Reactions key={event.id} reactions={[event]} />;
              case 9735:
                return <Zaps key={event.id} zaps={[event]} />;
              default:
                return null;
            }
          })}
        </TabsContent>
        <TabsContent value="mentions-replies">
          <MentionsAndReplies mentionsAndReplies={mentionsAndReplies} />
        </TabsContent>
        <TabsContent value="reposts">
          <Reposts reposts={reposts} />
        </TabsContent>
        <TabsContent value="reactions">
          <Reactions reactions={reactions} />
        </TabsContent>
        <TabsContent value="zaps">
          <Zaps zaps={zaps} />
        </TabsContent>
      </Tabs>
    </div>
  );
});
