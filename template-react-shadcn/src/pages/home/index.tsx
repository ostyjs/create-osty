import { GitHubLogoIcon } from '@radix-ui/react-icons';

import { ModeToggle } from '@/shared/components';
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

export const HomePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Card>
          <CardHeader>
            <CardTitle>Osty</CardTitle>
            <CardDescription>Bootstrap your next Nostr client in seconds.</CardDescription>
          </CardHeader>

          <Separator />

          <CardContent className="mt-6">
            {
              //
            }
          </CardContent>

          <Separator />

          <CardFooter className="mt-6 flex items-center gap-2">
            <p className="text-xs text-gray-500">
              Made with <span className="text-red-500">💜</span> by Sepehr
            </p>

            <Button variant="outline" size="icon" asChild className="ml-auto">
              <a href="https://github.com/sepehr-safari/osty" target="_blank" rel="noreferrer">
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
