"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Navigation, Loader2 } from "lucide-react";
import { MobileLayout } from "@/components/layout/mobile-layout";
import { Button } from "@/components/ui/button";
import { LocationPickerModal } from "@/components/modals/location-picker-modal";
import { mockUser } from "@/data/mockData";
import RecommendationResultModal from "@/components/modals/recommendation-result-modal";
import { useDecisionStore } from "@/zustand/use-decision-store";
import Timer from "@/components/wait/timer";
import { TrafficHeatmap } from "@/components/dashboard/traffic-heatmap";

export default function DashboardPage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationModalType, setLocationModalType] = useState<
    "pickup" | "destination"
  >("pickup");
  const [isRecommending, setIsRecommending] = useState(false);
  const [recommendation, setRecommendation] = useState<"wait" | "go" | null>(
    null
  );
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] =
    useState(false);
  const { decision } = useDecisionStore();

  useEffect(() => {
    if (recommendation) {
      setIsRecommendationModalOpen(true);
    }
  }, [recommendation]);

  const openLocationModal = (type: "pickup" | "destination") => {
    setLocationModalType(type);
    setLocationModalOpen(true);
  };

  const handleLocationSelect = (location: string) => {
    if (locationModalType === "pickup") {
      setPickup(location);
    } else {
      setDestination(location);
    }
  };

  const handleGetRecommendation = () => {
    setIsRecommending(true);

    setTimeout(() => {
      setIsRecommending(false);
      setRecommendation("wait");
    }, 2000);
  };

  return (
    <MobileLayout className="flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-primary mx-4 mt-4 p-4 rounded-2xl text-primary-foreground"
        >
          <div>
            <p className="opacity-80 text-sm">Welcome back,</p>
            <h2 className="font-bold text-xl">{mockUser.firstName}!</h2>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-right">
              <p className="opacity-70 text-xs">Mobile</p>
              <p className="font-medium text-sm">{mockUser.mobile}</p>
            </div>
          </div>
        </motion.div>
        {/* Wait timer */}
        {decision === "wait" && <Timer />}
        {/* Traffic Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-foreground">Traffic Flow</h3>
          </div>
          <TrafficHeatmap />
        </motion.div>

        {/* Commute Planner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-6 mb-4"
        >
          <h3 className="mb-4 font-semibold text-foreground">
            Plan Your Commute
          </h3>

          <div className="space-y-3">
            {/* Pickup */}
            <Button
              variant="outline"
              className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
              onClick={() => openLocationModal("pickup")}
            >
              <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10 shrink-0">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-muted-foreground text-xs">Pickup</p>
                <p className="font-medium text-foreground truncate">
                  {pickup || "Set pickup location"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>

            {/* Destination */}
            <Button
              variant="outline"
              className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
              onClick={() => openLocationModal("destination")}
            >
              <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10 shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-muted-foreground text-xs">Destination</p>
                <p className="font-medium text-foreground truncate">
                  {destination || "Where are you going?"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button
              size="lg"
              className="w-full"
              disabled={!pickup || !destination || isRecommending}
              onClick={handleGetRecommendation}
            >
              {isRecommending ? (
                <>
                  <Loader2 className="animate-spin" /> Getting recommendation...
                </>
              ) : (
                "Get recommendation"
              )}
            </Button>
            {/* Ride Type Picker */}
            {/* <div className="pt-2">
              <p className="mb-3 text-muted-foreground text-sm">
                Preferred Ride
              </p>
              <div className="flex flex-wrap gap-2 -mx-4 px-4 pb-2">
                {rideTypes.map((ride) => (
                  <Button
                    key={ride.id}
                    onClick={() => setSelectedRide(ride.id)}
                    variant="outline"
                    className={`shrink-0 h-[unset] flex flex-col items-center gap-1 p-3 rounded-lg border transition-all min-w-20 ${
                      selectedRide === ride.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl">{ride.icon}</span>
                    <span className="font-medium text-xs">{ride.label}</span>
                    <span className="text-muted-foreground text-xs">
                      ₱{ride.price}
                    </span>
                  </Button>
                ))}
              </div>
            </div> */}

            {/* Arrival Time */}
            {/* <div className="flex items-center gap-3 bg-card shadow-xs p-4 border border-border rounded-lg">
              <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Arrive by</p>
                <input
                  type="datetime-local"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="bg-transparent outline-none w-full font-medium text-foreground"
                />
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={handleLocationSelect}
        type={locationModalType}
      />
      <RecommendationResultModal
        open={isRecommendationModalOpen}
        setOpen={setIsRecommendationModalOpen}
        recommendation={recommendation}
        setRecommendation={setRecommendation}
        pickup={pickup}
        destination={destination}
      />
    </MobileLayout>
  );
}
