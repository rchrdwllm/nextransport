"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, ChevronRight, Navigation } from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LocationPickerModal } from "@/components/modals/LocationPickerModal";
import { rideTypes, mockUser } from "@/data/mockData";

export default function DashboardPage() {
  const router = useRouter();
  const [selectedRide, setSelectedRide] = useState("jeepney");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [locationModalType, setLocationModalType] = useState<
    "pickup" | "destination"
  >("pickup");

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

  const handlePlanCommute = () => {
    if (!pickup || !destination) return;
    router.push(
      `/commute/decision?pickup=${encodeURIComponent(
        pickup
      )}&destination=${encodeURIComponent(
        destination
      )}&rideType=${selectedRide}`
    );
  };

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 bg-card p-4 border-border border-b">
        <Logo size="sm" showText={false} />
        <div className="relative flex-1">
          <Search className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2" />
          <Input
            placeholder="Search places…"
            className="bg-secondary pl-10 border-0 h-10"
          />
        </div>
        <div className="flex justify-center items-center rounded-full w-10 h-10 font-bold text-primary-foreground gradient-primary">
          {mockUser.firstName[0]}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-4 p-4 rounded-2xl text-primary-foreground gradient-hero"
        >
          <p className="opacity-80 text-sm">Welcome back,</p>
          <h2 className="mb-3 font-bold text-xl">{mockUser.firstName}!</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="opacity-70 text-xs">Balance</p>
              <p className="font-bold text-lg">
                ₱{mockUser.balance.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="opacity-70 text-xs">Mobile</p>
              <p className="font-medium text-sm">{mockUser.mobile}</p>
            </div>
          </div>
        </motion.div>

        {/* Traffic Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-4"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-foreground">Traffic Flow</h3>
            <span className="text-muted-foreground text-xs">
              Historical Patterns
            </span>
          </div>
          <div className="relative bg-secondary rounded-2xl aspect-[16/9] overflow-hidden">
            {/* Simulated traffic heatmap */}
            <svg viewBox="0 0 320 180" className="w-full h-full">
              {/* Background */}
              <rect fill="hsl(var(--secondary))" width="320" height="180" />

              {/* Simplified Metro Manila roads */}
              <g opacity="0.4">
                {/* EDSA - Heavy traffic */}
                <path
                  d="M40 10 L40 170"
                  stroke="hsl(var(--traffic-heavy))"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* C5 - Moderate */}
                <path
                  d="M120 10 L120 170"
                  stroke="hsl(var(--traffic-moderate))"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* SLEX - Light */}
                <path
                  d="M200 90 L300 170"
                  stroke="hsl(var(--traffic-light))"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Horizontal roads */}
                <path
                  d="M10 60 L310 60"
                  stroke="hsl(var(--traffic-moderate))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M10 120 L310 120"
                  stroke="hsl(var(--traffic-light))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* Labels */}
              <text
                x="45"
                y="90"
                fontSize="10"
                fill="hsl(var(--foreground))"
                fontWeight="600"
              >
                EDSA
              </text>
              <text
                x="125"
                y="90"
                fontSize="10"
                fill="hsl(var(--foreground))"
                fontWeight="600"
              >
                C5
              </text>
              <text
                x="240"
                y="140"
                fontSize="10"
                fill="hsl(var(--foreground))"
                fontWeight="600"
              >
                SLEX
              </text>
            </svg>

            {/* Legend */}
            <div className="right-3 bottom-3 absolute flex items-center gap-3 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs">
              <span className="flex items-center gap-1">
                <div className="bg-traffic-light rounded-full w-3 h-3" />
                Light
              </span>
              <span className="flex items-center gap-1">
                <div className="bg-traffic-moderate rounded-full w-3 h-3" />
                Moderate
              </span>
              <span className="flex items-center gap-1">
                <div className="bg-traffic-heavy rounded-full w-3 h-3" />
                Heavy
              </span>
            </div>
          </div>
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
            <button
              className="flex items-center gap-3 bg-card p-4 border-2 border-border hover:border-primary/30 rounded-xl w-full text-left transition-colors"
              onClick={() => openLocationModal("pickup")}
            >
              <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                <Navigation className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Pickup</p>
                <p className="font-medium text-foreground">
                  {pickup || "Set pickup location"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Destination */}
            <button
              className="flex items-center gap-3 bg-card p-4 border-2 border-border hover:border-primary/30 rounded-xl w-full text-left transition-colors"
              onClick={() => openLocationModal("destination")}
            >
              <div className="flex justify-center items-center bg-accent/20 rounded-lg w-10 h-10">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-xs">Destination</p>
                <p className="font-medium text-foreground">
                  {destination || "Where are you going?"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Ride Type Picker */}
            <div className="pt-2">
              <p className="mb-3 text-muted-foreground text-sm">
                Preferred Ride
              </p>
              <div className="flex gap-2 -mx-4 px-4 pb-2 overflow-x-auto scrollbar-hide">
                {rideTypes.map((ride) => (
                  <button
                    key={ride.id}
                    onClick={() => setSelectedRide(ride.id)}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[80px] ${
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
                  </button>
                ))}
              </div>
            </div>

            {/* Arrival Time */}
            <div className="flex items-center gap-3 bg-card p-4 border-2 border-border rounded-xl">
              <div className="flex justify-center items-center bg-secondary rounded-lg w-10 h-10">
                <Clock className="w-5 h-5 text-muted-foreground" />
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
            </div>
          </div>

          {/* Plan Button */}
          <Button
            size="lg"
            className="mt-6 w-full"
            disabled={!pickup || !destination}
            onClick={handlePlanCommute}
          >
            Plan Commute
          </Button>
        </motion.div>
      </div>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={handleLocationSelect}
        type={locationModalType}
      />
    </MobileLayout>
  );
}
