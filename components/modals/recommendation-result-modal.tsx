import { useRouter } from "@bprogress/next";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { AlertCircle, Bike, Bus, Clock, TrendingUp } from "lucide-react";
import { useDecisionStore } from "@/zustand/use-decision-store";

type RecommendationResultModalProps = {
  recommendation: "wait" | "go" | null;
  setRecommendation: (value: "wait" | "go" | null) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  pickup: string;
  destination: string;
};

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

const RecommendationResultModal = ({
  recommendation,
  setOpen,
  setRecommendation,
  open,
  pickup,
  destination,
}: RecommendationResultModalProps) => {
  const router = useRouter();
  const { decision, setDecision } = useDecisionStore();

  const {
    confidence,
    waitEstimate,
    reason,
    trafficStatus,
    publicTransportCost,
    rideCost,
  } = mockRecommendation;

  const handleOpenChange = () => {
    setOpen(!open);
    setRecommendation(null);
  };

  const confidenceColors = {
    high: "bg-primary text-background",
    medium: "bg-amber-500 text-background",
    low: "bg-red-700 text-background",
  };

  const trafficColors = {
    light: "text-traffic-light",
    moderate: "text-traffic-moderate",
    heavy: "text-traffic-heavy",
  };

  const handleWait = () => {
    setOpen(false);
    setRecommendation(null);
    setDecision("wait");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recommendation</DialogTitle>
          <DialogDescription>
            {recommendation === "wait" &&
              "Based on current traffic conditions, we recommend waiting for public transportation."}
            {recommendation === "go" &&
              "Based on current traffic conditions, we recommend booking a ride now."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 space-y-4 overflow-y-auto">
          <div className="bg-card p-6 border border-border rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <div
                className={`px-6 py-3 rounded-xl ${
                  recommendation === "wait"
                    ? "bg-primary text-background"
                    : "bg-accent text-accent-foreground"
                }`}
              >
                <span className="font-bold text-2xl uppercase">
                  {recommendation === "wait" ? "WAIT" : "GO NOW"}
                </span>
              </div>
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
          </div>

          {/* Cost Comparison */}
          <div className="bg-card p-4 border border-border rounded-2xl">
            <h3 className="mb-3 font-semibold text-foreground">
              Cost Comparison
            </h3>
            <div className="gap-3 grid grid-cols-2">
              <div className="bg-secondary p-4 border border-primary rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Bus className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground text-sm">
                    Public
                  </span>
                </div>
                <p className="font-bold text-primary text-2xl">
                  ₱{publicTransportCost}
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Jeepney fare
                </p>
              </div>
              <div className="bg-muted p-4 border border-border rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Bike className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground text-sm">
                    Motor
                  </span>
                </div>
                <p className="font-bold text-muted-foreground text-2xl">
                  ₱{rideCost}
                </p>
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
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              if (recommendation === "wait") {
                router.push(
                  `/select-rider?pickup=${encodeURIComponent(
                    pickup
                  )}&destination=${encodeURIComponent(destination)}`
                );
              } else {
                handleWait();
              }
            }}
            className="flex-1"
            variant="outline"
          >
            {recommendation === "wait"
              ? "I'll book instead"
              : "I'll wait instead"}
          </Button>
          <Button
            onClick={() => {
              if (recommendation === "wait") {
                handleWait();
              } else {
                router.push(
                  `/select-rider?pickup=${encodeURIComponent(
                    pickup
                  )}&destination=${encodeURIComponent(destination)}`
                );
              }
            }}
            className="flex-1"
          >
            {recommendation === "wait"
              ? "Proceed to wait"
              : "I'll book instead"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationResultModal;
