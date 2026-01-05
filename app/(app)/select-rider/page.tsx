import RiderSelection from "@/components/select-rider/select-rider";

const SelectRiderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ pickup: string; destination: string }>;
}) => {
  const { pickup, destination } = await searchParams;

  return <RiderSelection pickup={pickup} destination={destination} />;
};

export default SelectRiderPage;
