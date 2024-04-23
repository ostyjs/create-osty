import { GitHubLogoIcon } from '@radix-ui/react-icons';

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

import { Login } from './example-components/login';
import { ZapMe } from './example-components/zap-me';

export const HomePage = () => {
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
            <ZapMe />
            <Login />
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
