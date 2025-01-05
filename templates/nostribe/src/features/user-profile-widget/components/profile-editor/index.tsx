import { zodResolver } from '@hookform/resolvers/zod';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { UploadIcon } from '@radix-ui/react-icons';
import { useNip98, useUpdateUserProfile } from 'nostr-hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/components/ui/use-toast';

import { Spinner } from '@/shared/components/spinner';

import { ProfileAvatar } from '../profile-avatar';
import { ProfileBanner } from '../profile-banner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  about: z.string().optional(),
  image: z.string().optional(),
  nip05: z.string().optional(),
  banner: z.string().optional(),
});

export const ProfileEditor = ({
  setEditMode,
  initialProfile,
}: {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  initialProfile?: NDKUserProfile | null | undefined;
}) => {
  const [isUploadingMedia, setisUploadingMedia] = useState(false);

  const { toast } = useToast();

  const { getToken } = useNip98();

  const { updateUserProfile } = useUpdateUserProfile();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialProfile?.name || '',
      about: initialProfile?.about || '',
      image: initialProfile?.image || '',
      nip05: initialProfile?.nip05 || '',
      banner: initialProfile?.banner || '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserProfile(values);
    setEditMode(false);
  };

  const openUploadMediaDialog = (type: 'image' | 'banner') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';

    input.onchange = async (event) => {
      const token = await getToken({
        url: import.meta.env.VITE_NOSTR_BUILD_UPLOAD_API_ENDPOINT,
        method: 'POST',
      });

      if (!token) {
        toast({
          title: 'Error',
          description: 'Failed to upload media',
          variant: 'destructive',
        });

        return;
      }

      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.append('fileToUpload', file);

      setisUploadingMedia(true);

      fetch(import.meta.env.VITE_NOSTR_BUILD_UPLOAD_API_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then(({ status, data }) => {
          if (status === 'success' && data?.[0]?.url) {
            form.setValue(type, data[0].url);
          } else {
            toast({
              title: 'Error',
              description: 'Failed to upload media',
              variant: 'destructive',
            });
          }
        })
        .catch(() => {
          toast({
            title: 'Error',
            description: 'Failed to upload media',
            variant: 'destructive',
          });
        })
        .finally(() => {
          setisUploadingMedia(false);
        });
    };

    input.click();
  };

  return (
    <>
      <ProfileBanner banner={form.watch().banner} />

      <ProfileAvatar image={form.watch().image} />

      <div className="p-4 pt-16 flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar Image Url</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <Button
                      type="button"
                      variant="secondary"
                      className="flex items-center"
                      onClick={() => openUploadMediaDialog('image')}
                      disabled={isUploadingMedia}
                    >
                      {isUploadingMedia ? (
                        <Spinner />
                      ) : (
                        <>
                          <UploadIcon className="mr-2" />
                          <span>Upload Avatar</span>
                        </>
                      )}
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image Url</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <Button
                      type="button"
                      variant="secondary"
                      className="flex items-center"
                      onClick={() => openUploadMediaDialog('banner')}
                      disabled={isUploadingMedia}
                    >
                      {isUploadingMedia ? (
                        <Spinner />
                      ) : (
                        <>
                          <UploadIcon className="mr-2" />
                          <span>Upload Banner</span>
                        </>
                      )}
                    </Button>
                  </div>
                </FormItem>
              )}
            />

            {/* <FormField
            control={form.control}
            name="nip05"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIP-05</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          /> */}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                className="w-1/3"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>

              <Button type="submit" className="w-2/3">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};
