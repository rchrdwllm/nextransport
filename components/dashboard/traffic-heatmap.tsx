"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { useGoogleMapsScript } from "@/hooks/use-google-maps-script";
import { useLocationStore } from "@/zustand/use-location-store";

export function TrafficHeatmap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useGoogleMapsScript();
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { lat, lng } = useLocationStore();

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstance) return;

    // Default center to Metro Manila
    const center = {
      lat: lat ?? 14.5995,
      lng: lng ?? 120.9842,
    };

    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    setMapInstance(map);
  }, [isLoaded, mapInstance]);

  return (
    <div className="relative bg-secondary rounded-2xl aspect-video overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex justify-center items-center bg-secondary">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />

      {/* Legend Overlay */}
      <div className="right-3 bottom-3 absolute flex items-center gap-3 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg text-xs pointer-events-none">
        <span className="flex items-center gap-1">
          <div className="bg-[#63D668] rounded-full w-3 h-3" />
          Fast
        </span>
        <span className="flex items-center gap-1">
          <div className="bg-[#FF974D] rounded-full w-3 h-3" />
          Slow
        </span>
        <span className="flex items-center gap-1">
          <div className="bg-[#F23C32] rounded-full w-3 h-3" />
          Heavy
        </span>
      </div>
    </div>
  );
}
