"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  Bus,
  Bike,
  X,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "@bprogress/next";

type Recommendation = "wait" | "go";
type Confidence = "high" | "medium" | "low";

interface CommuteRecommendation {
  recommendation: Recommendation;
  confidence: Confidence;
  waitEstimate: string;
  reason: string;
  trafficStatus: "light" | "moderate" | "heavy";
  publicTransportCost: number;
  rideCost: number;
}

const mockRecommendation: CommuteRecommendation = {
  recommendation: "wait",
  confidence: "high",
  waitEstimate: "6-12 mins",
  reason:
    "Frequent jeepneys on this corridor during rush hour. Public transport is the most cost-effective option.",
  trafficStatus: "moderate",
  publicTransportCost: 12,
  rideCost: 145,
};

const nearbySuggestions = [
  { location: "EDSA Taft", ride: "Jeepney (Route 5)", wait: "3 mins" },
  { location: "Taft LRT", ride: "P2P Bus", wait: "7 mins" },
  { location: "Vito Cruz", ride: "Jeepney (Route 8)", wait: "5 mins" },
];

export default function CommuteDecision({
  pickup,
  destination,
  rideType,
}: {
  pickup: string;
  destination: string;
  rideType: string;
}) {
    const router = useRouter();
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [waitingSeconds, setWaitingSeconds] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const {
    recommendation,
    confidence,
    waitEstimate,
    reason,
    trafficStatus,
    publicTransportCost,
    rideCost,
  } = mockRecommendation;

  // Simulate waiting timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWaiting) {
      interval = setInterval(() => {
        setWaitingSeconds((prev) => {
          // Show suggestion after 10 seconds (simulating 10 minutes)
          if (prev === 10) {
            setShowSuggestionModal(true);
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWaiting]);

  const handleTakePublicTransport = () => {
    setIsWaiting(true);
  };

  const handleBookRide = () => {
    router.push(
      `/rides/select?pickup=${encodeURIComponent(
        pickup
      )}&destination=${encodeURIComponent(destination)}`
    );
  };

  const confidenceColors = {
    high: "bg-traffic-light text-background",
    medium: "bg-traffic-moderate text-background",
    low: "bg-traffic-heavy text-background",
  };

  const trafficColors = {
    light: "text-traffic-light",
    moderate: "text-traffic-moderate",
    heavy: "text-traffic-heavy",
  };

  return (
    <MobileLayout className="flex flex-col bg-background">
      {/* Header */}
      <header className="safe-top flex items-center gap-3 bg-card p-4 border-border border-b">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center bg-secondary rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">Commute Decision</h2>
          <p className="text-muted-foreground text-xs">
            {pickup} → {destination}
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 overflow-y-auto">
        {/* Recommendation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 border border-border rounded-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`px-6 py-3 rounded-xl ${
                recommendation === "wait"
                  ? "bg-traffic-light text-background"
                  : "bg-accent text-accent-foreground"
              }`}
            >
              <span className="font-bold text-2xl uppercase">
                {recommendation === "wait" ? "WAIT" : "GO NOW"}
              </span>
            </motion.div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${confidenceColors[confidence]}`}
            >
              {confidence.charAt(0).toUpperCase() + confidence.slice(1)}{" "}
              Confidence
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">
                Public transport in <strong>{waitEstimate}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <TrendingUp
                className={`w-5 h-5 ${trafficColors[trafficStatus]}`}
              />
              <span className="text-foreground">
                Current traffic:{" "}
                <strong className={trafficColors[trafficStatus]}>
                  {trafficStatus.charAt(0).toUpperCase() +
                    trafficStatus.slice(1)}
                </strong>{" "}
                on EDSA
              </span>
            </div>

            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">{reason}</span>
            </div>
          </div>
        </motion.div>

        {/* Cost Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-4 border border-border rounded-2xl"
        >
          <h3 className="mb-3 font-semibold text-foreground">
            Cost Comparison
          </h3>
          <div className="gap-3 grid grid-cols-2">
            <div className="bg-primary/5 p-4 border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Bus className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground text-sm">
                  Public
                </span>
              </div>
              <p className="font-bold text-primary text-2xl">
                ₱{publicTransportCost}
              </p>
              <p className="mt-1 text-muted-foreground text-xs">Jeepney fare</p>
            </div>
            <div className="bg-accent/10 p-4 border border-accent/20 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Bike className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground text-sm">
                  Motor
                </span>
              </div>
              <p className="font-bold text-accent text-2xl">₱{rideCost}</p>
              <p className="mt-1 text-muted-foreground text-xs">
                Angkas estimate
              </p>
            </div>
          </div>
          <p className="mt-3 text-muted-foreground text-sm text-center">
            You save{" "}
            <strong className="text-traffic-light">
              ₱{rideCost - publicTransportCost}
            </strong>{" "}
            with public transport
          </p>
        </motion.div>

        {/* Waiting Status */}
        {isWaiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/10 p-4 border border-primary/30 rounded-2xl"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">
                  Waiting for transport
                </p>
                <p className="font-bold text-primary text-2xl">
                  {Math.floor(waitingSeconds / 60)}:
                  {(waitingSeconds % 60).toString().padStart(2, "0")}
                </p>
              </div>
              <div className="border-4 border-primary border-t-transparent rounded-full w-12 h-12 animate-spin" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="safe-bottom space-y-3 bg-card p-4 border-border border-t">
        {!isWaiting ? (
          <>
            <Button
              size="lg"
              className="w-full"
              onClick={handleTakePublicTransport}
            >
              <Bus className="mr-2 w-5 h-5" />
              Take Public Transport
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleBookRide}
            >
              <Bike className="mr-2 w-5 h-5" />
              Book a Ride — ₱{rideCost}
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleBookRide}
          >
            <Bike className="mr-2 w-5 h-5" />
            Change to Ride — ₱{rideCost}
          </Button>
        )}
      </div>

      {/* Suggestion Modal */}
      <AnimatePresence>
        {showSuggestionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 flex justify-center items-end bg-background/80 backdrop-blur-sm"
            onClick={() => setShowSuggestionModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="safe-bottom bg-card p-6 rounded-t-3xl w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-foreground text-lg">
                  Optimize Your Wait
                </h3>
                <button
                  onClick={() => setShowSuggestionModal(false)}
                  className="flex justify-center items-center bg-secondary rounded-full w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mb-4 text-muted-foreground text-sm">
                Nearby high-frequency stops with shorter wait times:
              </p>
              <div className="space-y-3">
                {nearbySuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-3 bg-secondary hover:bg-secondary/80 p-4 rounded-xl w-full text-left transition-colors"
                    onClick={() => {
                      setShowSuggestionModal(false);
                      // Could navigate to walking directions
                    }}
                  >
                    <div className="flex justify-center items-center bg-primary/10 rounded-full w-10 h-10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {suggestion.location}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {suggestion.ride}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-traffic-light text-sm">
                        {suggestion.wait}
                      </p>
                      <p className="text-muted-foreground text-xs">wait</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="lg"
                className="mt-4 w-full"
                onClick={() => setShowSuggestionModal(false)}
              >
                Stay at current location
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
}
