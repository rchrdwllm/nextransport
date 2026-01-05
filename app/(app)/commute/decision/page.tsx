import CommuteDecision from "@/components/commute-decision/commute-decision";

const CommuteDecisionPage = async ({
  params,
}: {
  params: Promise<{ pickup: string; destination: string; rideType: string }>;
}) => {
  const { pickup, destination, rideType } = await params;

  return (
    <CommuteDecision
      pickup={pickup}
      destination={destination}
      rideType={rideType}
    />
  );
};

export default CommuteDecisionPage;
