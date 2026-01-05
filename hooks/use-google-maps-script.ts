import { useEffect, useState } from "react";

export const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already loaded
    if (window.google?.maps) {
      setIsLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script tag already exists
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const interval = setInterval(() => {
        if (window.google?.maps) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(interval);
        }
      }, 100);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key not found");
      setIsLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&language=en`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps script");
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return { isLoaded, isLoading };
};
