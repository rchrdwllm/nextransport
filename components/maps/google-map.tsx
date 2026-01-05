"use client";

import { useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import { useGoogleMapsScript } from "@/hooks/use-google-maps-script";

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title: string;
    draggable?: boolean;
    onDragEnd?: (lat: number, lng: number) => void;
  }>;
  onClick?: (lat: number, lng: number) => void;
  className?: string;
}

export function GoogleMap({
  center = { lat: 14.5994, lng: 120.9842 }, // Metro Manila
  zoom = 15,
  markers = [],
  onClick,
  className = "w-full h-full",
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useGoogleMapsScript();

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      zoom,
      center,
      disableDefaultUI: true,
      mapTypeControl: false,
      fullscreenControl: true,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Add markers
    markers.forEach((markerConfig) => {
      const marker = new google.maps.Marker({
        position: { lat: markerConfig.lat, lng: markerConfig.lng },
        map: map,
        draggable: markerConfig.draggable || false,
        title: markerConfig.title,
      });

      if (markerConfig.draggable && markerConfig.onDragEnd) {
        marker.addListener("dragend", () => {
          const position = marker.getPosition();
          if (position) {
            markerConfig.onDragEnd!(position.lat(), position.lng());
          }
        });
      }
    });

    // Add click listener
    if (onClick) {
      map.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          onClick(e.latLng.lat(), e.latLng.lng());
        }
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [isLoaded, center, zoom, markers, onClick]);

  if (!isLoaded) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <Loader className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground text-sm">Loading map...</p>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
}
