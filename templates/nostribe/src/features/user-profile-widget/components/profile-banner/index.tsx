export const ProfileBanner = ({ banner }: { banner: string | undefined }) => {
  return (
    <>
      <div className="w-full h-28 bg-muted">
        {banner && <img src={banner} alt="profile-banner" className="w-full h-full object-cover" />}
      </div>
    </>
  );
};
