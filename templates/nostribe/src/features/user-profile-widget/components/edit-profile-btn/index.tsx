import { Button } from '@/shared/components/ui/button';

export const EditProfileBtn = ({
  setEditMode,
}: {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Button variant="secondary" className="rounded-full" onClick={() => setEditMode(true)}>
        Edit Profile
      </Button>
    </>
  );
};
