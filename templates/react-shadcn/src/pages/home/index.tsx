import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useActiveUser, useNdk } from 'nostr-hooks';

import { ModeToggle } from '@/shared/components/mode-toggle';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';

import { LoginWidget } from '@/features/login-widget';
import { LogoutWidget } from '@/features/logout-widget';
import { ZapWidget } from '@/features/zap-widget';

export const HomePage = () => {
  const { ndk } = useNdk();
  const { activeUser } = useActiveUser();

  const zapTarget = ndk?.getUser({
    pubkey: '3e294d2fd339bb16a5403a86e3664947dd408c4d87a0066524f8a573ae53ca8e', // Sep
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Card>
          <CardHeader>
            <CardTitle>Osty</CardTitle>
            <CardDescription>Start building on Nostr in seconds with Osty</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="mt-6 flex gap-4">
            {zapTarget && <ZapWidget target={zapTarget} />}

            {activeUser ? <LogoutWidget /> : <LoginWidget />}
          </CardContent>

          <Separator />

          <CardFooter className="mt-6 flex items-center gap-2">
            <p className="text-xs text-gray-500">
              Made with <span className="text-red-500">💜</span> by Sepehr
            </p>

            <Button variant="outline" size="icon" asChild className="ml-auto">
              <a href="https://github.com/ostyjs/create-osty" target="_blank" rel="noreferrer">
                <GitHubLogoIcon />
              </a>
            </Button>

            <ModeToggle />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
