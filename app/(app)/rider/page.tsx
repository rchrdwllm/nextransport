const RiderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ pickup: string; destination: string }>;
}) => {
  const { pickup, destination } = await searchParams;

  return (
    <div>
      {pickup} {destination}
    </div>
  );
};

export default RiderPage;
