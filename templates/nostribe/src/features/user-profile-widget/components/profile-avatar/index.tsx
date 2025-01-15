import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

export const ProfileAvatar = ({ image }: { image: string | undefined }) => {
  return (
    <>
      <Avatar className="ring ring-white bg-muted w-24 h-24 absolute top-16 left-4">
        <AvatarImage src={image} alt="profile-avatar" className="object-cover" />
        <AvatarFallback />
      </Avatar>
    </>
  );
};
