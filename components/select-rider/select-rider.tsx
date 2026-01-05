"use client";

import { MobileLayout } from "@/components/layout/mobile-layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Star, Clock, MapPin, Bike } from "lucide-react";
import { useState } from "react";
import { useRouter } from "@bprogress/next";

// Mock Data
const mockRiders = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    vehicle: "Honda ADV150",
    plate: "ABC 1234",
    rating: 4.8,
    time: "3 min",
    distance: "0.4 km",
    price: 145,
    avatar: "JDC",
  },
  {
    id: "2",
    name: "Maria Santos",
    vehicle: "Yamaha NMAX",
    plate: "XYZ 5678",
    rating: 4.9,
    time: "5 min",
    distance: "0.7 km",
    price: 152,
    avatar: "MS",
  },
  {
    id: "3",
    name: "Pedro Penduko",
    vehicle: "Suzuki Burgman",
    plate: "LMN 9012",
    rating: 4.7,
    time: "8 min",
    distance: "1.2 km",
    price: 160,
    avatar: "PP",
  },
];

type RiderSelectionProps = { pickup: string; destination: string };

export default function RiderSelection({
  pickup,
  destination,
}: RiderSelectionProps) {
  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const router = useRouter();

  const handleBook = () => {
    // In a real app, you'd probably send the selected rider info to the backend here
    router.push("/active-ride");
  };

  return (
    <MobileLayout className="flex flex-col">
      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* Trip Details Card */}
        <div className="p-4 border border-border rounded-2xl">
          <div className="space-y-6">
            <div className="relative space-y-6 ml-2">
              {/* Timeline Line */}
              <div className="top-2 bottom-8 left-1.25 absolute bg-slate-200 w-0.5" />

              {/* Pickup */}
              <div className="relative flex gap-4">
                <div className="z-10 bg-white rounded-full ring-4 ring-white w-3 h-3">
                  <div className="bg-emerald-500 rounded-full w-full h-full" />
                </div>
                <div className="-mt-1.5 pb-4 border-b w-full">
                  <p className="text-muted-foreground text-xs">Pickup</p>
                  <p className="font-semibold text-sm">{pickup}</p>
                </div>
              </div>

              {/* Destination */}
              <div className="relative flex gap-4">
                <div className="z-10 bg-white rounded-full ring-4 ring-white w-3 h-3">
                  <div className="bg-red-500 rounded-full w-full h-full" />
                </div>
                <div className="-mt-1.5 w-full">
                  <p className="text-muted-foreground text-xs">Destination</p>
                  <p className="font-semibold text-sm">{destination}</p>
                </div>
              </div>
            </div>

            {/* Trip Info Footer */}
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bike className="w-4 h-4 text-red-500" />
                <span className="font-semibold text-sm">Moto</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>8:30 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Riders List */}
        <div className="mt-6">
          <h3 className="mb-3 ml-1 text-muted-foreground text-sm">
            {mockRiders.length} riders nearby
          </h3>

          <div className="space-y-3">
            {mockRiders.map((rider) => (
              <Card
                key={rider.id}
                className={`p-4 shadow-xs cursor-pointer transition-all border ${
                  selectedRider === rider.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-primary/30"
                }`}
                onClick={() => setSelectedRider(rider.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Avatar className="bg-slate-100 w-12 h-12">
                      <AvatarFallback className="bg-slate-100 font-bold text-slate-600">
                        {rider.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="h-full">
                      <h4 className="font-bold text-sm">{rider.name}</h4>
                      <p className="text-muted-foreground text-xs">
                        {rider.vehicle} • {rider.plate}
                      </p>
                      <div className="flex items-center gap-3 mt-4 text-xs">
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <Clock className="w-3.5 h-3.5" />
                          {rider.time}
                        </div>
                        <div className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5" />
                          {rider.distance}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-6">
                    <div className="flex items-center gap-1 bg-amber-100 px-1.5 py-0.5 rounded font-medium text-amber-700 text-xs">
                      <Star className="fill-amber-700 w-3 h-3 text-amber-700" />
                      {rider.rating}
                    </div>
                    <span className="font-bold text-primary text-lg">
                      ₱{rider.price}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="right-0 bottom-0 left-0 fixed bg-background p-4 border-border border-t">
        <Button
          onClick={handleBook}
          className="w-full"
          disabled={!selectedRider}
        >
          Book rider
        </Button>
      </div>
    </MobileLayout>
  );
}
