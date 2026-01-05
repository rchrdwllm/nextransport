"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  X,
  AlertTriangle,
  Star,
  CheckCircle,
} from "lucide-react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { mockRiders } from "@/data/mockData";
import { useRouter } from "@bprogress/next";
import { useSearchParams } from "next/navigation";

type RideStatus = "approaching" | "arrived" | "in_progress" | "completed";

export default function ActiveRide() {
  const router = useRouter();
  const id = "kjfhjsdfskdf";
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<RideStatus>("approaching");
  const [riderPosition, setRiderPosition] = useState({ x: 20, y: 80 });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [appRating, setAppRating] = useState(0);
  const [riderRating, setRiderRating] = useState(0);
  const [eta, setEta] = useState(5);

  const pickup = searchParams.get("pickup") || "Current Location";
  const destination = searchParams.get("destination") || "Makati CBD";

  const rider = mockRiders.find((r) => r.id === id) || mockRiders[0];

  // Simulate rider movement
  useEffect(() => {
    const userPosition = { x: 50, y: 40 };
    const destinationPos = { x: 80, y: 20 };

    const interval = setInterval(() => {
      setRiderPosition((prev) => {
        let targetX, targetY;

        if (status === "approaching") {
          targetX = userPosition.x;
          targetY = userPosition.y;
        } else if (status === "in_progress") {
          targetX = destinationPos.x;
          targetY = destinationPos.y;
        } else {
          return prev;
        }

        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 3) {
          if (status === "approaching") {
            setStatus("arrived");
          } else if (status === "in_progress") {
            setStatus("completed");
            setShowRatingModal(true);
          }
          return prev;
        }

        return {
          x: prev.x + dx * 0.05,
          y: prev.y + dy * 0.05,
        };
      });

      setEta((prev) => Math.max(0, prev - 0.1));
    }, 200);

    return () => clearInterval(interval);
  }, [status]);

  const handleStartRide = () => {
    setStatus("in_progress");
    setEta(12);
  };

  const handleCancelRide = () => {
    router.push("/dashboard");
  };

  const handleSubmitRating = () => {
    setShowRatingModal(false);
    router.push("/dashboard");
  };

  const statusMessages = {
    approaching: "Rider is on the way",
    arrived: "Rider has arrived!",
    in_progress: "Ride in progress",
    completed: "You've arrived!",
  };

  return (
    <MobileLayout className="flex flex-col bg-background">
      {/* Header */}
      <header className="safe-top flex items-center gap-3 bg-card p-4 border-border border-b">
        <button
          onClick={() => setShowCancelModal(true)}
          className="flex justify-center items-center bg-secondary rounded-full w-10 h-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">
            {statusMessages[status]}
          </h2>
          <p className="text-muted-foreground text-xs">
            {status === "in_progress"
              ? `${pickup} → ${destination}`
              : `ETA: ${Math.ceil(eta)} mins`}
          </p>
        </div>
      </header>

      {/* Map View */}
      <div className="relative flex-1 bg-secondary">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background */}
          <rect fill="hsl(var(--secondary))" width="100" height="100" />

          {/* Grid */}
          <defs>
            <pattern
              id="smallGrid"
              width="5"
              height="5"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 5 0 L 0 0 0 5"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#smallGrid)" opacity="0.5" />

          {/* Roads */}
          <path
            d="M0 40 L100 40"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="3"
            opacity="0.3"
          />
          <path
            d="M50 0 L50 100"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="3"
            opacity="0.3"
          />
          <path
            d="M20 20 L80 80"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            opacity="0.2"
          />

          {/* Route line */}
          {status === "in_progress" && (
            <path
              d="M50 40 Q65 30 80 20"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="3 2"
              fill="none"
              opacity="0.5"
            />
          )}

          {/* Destination marker */}
          <g transform="translate(80, 20)">
            <circle r="4" fill="hsl(var(--accent))" />
            <circle r="8" fill="hsl(var(--accent))" opacity="0.3" />
          </g>

          {/* User marker */}
          <g transform="translate(50, 40)">
            <circle r="4" fill="hsl(var(--primary))" />
            <circle r="8" fill="hsl(var(--primary))" opacity="0.3">
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0.1;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Rider marker */}
          <motion.g
            animate={{ x: riderPosition.x, y: riderPosition.y }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <circle r="3" fill="hsl(var(--accent))" />
            <text
              y="-6"
              textAnchor="middle"
              fontSize="4"
              fill="hsl(var(--foreground))"
            >
              🏍️
            </text>
          </motion.g>
        </svg>

        {/* Legend */}
        <div className="bottom-4 left-4 absolute space-y-1 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-xl text-xs">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full w-3 h-3" />
            <span>You</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">🏍️</span>
            <span>Rider</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-accent rounded-full w-3 h-3" />
            <span>Destination</span>
          </div>
        </div>
      </div>

      {/* Rider Info Card */}
      <div className="bg-card p-4 border-border border-t">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex justify-center items-center bg-gradient-to-br from-primary to-accent rounded-2xl w-14 h-14 font-bold text-primary-foreground text-xl">
            {rider.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{rider.name}</h3>
            <p className="text-muted-foreground text-sm">
              {rider.vehicle} • {rider.plateNumber}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="fill-accent w-4 h-4 text-accent" />
              <span className="font-medium text-sm">{rider.rating}</span>
              <span className="text-muted-foreground text-xs">
                ({rider.trips} trips)
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-sm">Fare</p>
            <p className="font-bold text-primary text-xl">₱{rider.price}</p>
          </div>
        </div>

        {/* Communication buttons */}
        <div className="flex gap-3 mb-4">
          <Button variant="outline" size="lg" className="flex-1">
            <MessageCircle className="mr-2 w-5 h-5" />
            Chat
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <Phone className="mr-2 w-5 h-5" />
            Call
          </Button>
        </div>

        {/* Action buttons based on status */}
        <div className="safe-bottom space-y-3">
          {status === "arrived" && (
            <Button size="lg" className="w-full" onClick={handleStartRide}>
              <CheckCircle className="mr-2 w-5 h-5" />
              Start Ride
            </Button>
          )}

          {(status === "approaching" || status === "in_progress") && (
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-destructive/10 border-destructive/30 w-full text-destructive"
              onClick={() => setShowCancelModal(true)}
            >
              <X className="mr-2 w-5 h-5" />
              Cancel Ride
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 flex justify-center items-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card p-6 rounded-2xl w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center items-center bg-destructive/10 mx-auto mb-4 rounded-full w-16 h-16">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="mb-2 font-bold text-foreground text-lg text-center">
                Cancel Ride?
              </h3>
              <p className="mb-6 text-muted-foreground text-sm text-center">
                Are you sure you want to cancel? A cancellation fee may apply.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Ride
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  onClick={handleCancelRide}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRatingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50 fixed inset-0 flex justify-center items-end bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card p-6 rounded-t-3xl w-full max-w-lg"
            >
              <div className="mb-6 text-center">
                <div className="flex justify-center items-center bg-traffic-light/20 mx-auto mb-4 rounded-full w-20 h-20">
                  <CheckCircle className="w-10 h-10 text-traffic-light" />
                </div>
                <h3 className="font-bold text-foreground text-xl">
                  You've Arrived! 🎉
                </h3>
                <p className="mt-1 text-muted-foreground text-sm">
                  {pickup} → {destination}
                </p>
              </div>

              {/* App Rating */}
              <div className="mb-6">
                <p className="mb-2 font-medium text-foreground text-sm">
                  Rate NexTransport
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setAppRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= appRating
                            ? "text-accent fill-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Rider Rating */}
              <div className="mb-6">
                <p className="mb-2 font-medium text-foreground text-sm">
                  Rate {rider.name}
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRiderRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= riderRating
                            ? "text-primary fill-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <Button
                size="lg"
                className="safe-bottom w-full"
                onClick={handleSubmitRating}
              >
                Submit & Return Home
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
}
