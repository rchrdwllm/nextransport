import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { XIcon, CheckCircle, Star } from "lucide-react";
import { useDecisionStore } from "@/zustand/use-decision-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Timer = () => {
  const [count, setCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [count]);
  const { setDecision } = useDecisionStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    setIsOpen(false);
    setDecision(null);
  };

  return (
    <div className="space-y-3 p-4 pb-0">
      <div>
        <h3 className="font-semibold text-foreground">
          Waiting for Public Transport
        </h3>
        <p className="text-muted-foreground text-sm">ETA: 6 minutes</p>
      </div>
      <div className="flex justify-between items-center bg-secondary p-4 border border-border rounded-2xl">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="h-[unset] aspect-square">
              <XIcon className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center pt-4">
              <div className="flex justify-center items-center bg-green-100 mb-4 rounded-full w-20 h-20">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl text-center">
                  Transport Arrived!
                </DialogTitle>
              </DialogHeader>
              <div className="py-6 w-full">
                <p className="mb-4 font-medium text-sm text-center">
                  Rate this recommendation
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleSubmit}>
                Submit & Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <h3 className="font-bold text-primary text-4xl">{formattedTime}</h3>
      </div>
    </div>
  );
};

export default Timer;
