import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  Search,
  MapPin,
  Clock,
  Star,
  GripVertical,
  ChevronRight,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { savedLocations, recentSearches } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { useGoogleMapsScript } from "@/hooks/use-google-maps-script";

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  type: "pickup" | "destination";
}

export function LocationPickerModal({
  isOpen,
  onClose,
  onSelect,
  type,
}: LocationPickerModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });
  const [showMap, setShowMap] = useState(false);
  const [selectedLocationName, setSelectedLocationName] = useState(
    "Near EDSA, Metro Manila"
  );
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [autocompleteInstance, setAutocompleteInstance] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isLoaded } = useGoogleMapsScript();

  // Get user's current location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoadingLocation(false);
        },
        () => {
          setIsLoadingLocation(false);
          // Fallback to Metro Manila
          setUserLocation({ lat: 14.5994, lng: 120.9842 });
        }
      );
    } else {
      setIsLoadingLocation(false);
      // Fallback to Metro Manila
      setUserLocation({ lat: 14.5994, lng: 120.9842 });
    }
  };

  // Get user location when modal opens
  useEffect(() => {
    if (isOpen && !userLocation) {
      getUserLocation();
    }
  }, [isOpen, userLocation]);

  // Initialize Google Maps and Autocomplete
  useEffect(() => {
    if (!isLoaded || !searchInputRef.current || autocompleteInstance) return;

    const service = new google.maps.places.AutocompleteService();
    const sessionToken = new google.maps.places.AutocompleteSessionToken();

    const handlePredictions = (
      predictions: google.maps.places.AutocompletePrediction[] | null
    ) => {
      if (predictions) {
        setPredictions(predictions);
      }
    };

    const inputElement = searchInputRef.current;
    const handleInput = () => {
      const value = inputElement.value;
      if (value.length > 2) {
        service.getPlacePredictions(
          {
            input: value,
            sessionToken: sessionToken,
            componentRestrictions: { country: "ph" }, // Philippines
          },
          handlePredictions
        );
      } else {
        setPredictions([]);
      }
    };

    inputElement.addEventListener("input", handleInput);

    return () => {
      inputElement.removeEventListener("input", handleInput);
    };
  }, [isLoaded, autocompleteInstance]);

  // Reset map instance when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMapInstance(null);
      setShowMap(false);
    }
  }, [isOpen]);

  // Initialize Google Map when showing map
  useEffect(() => {
    if (!showMap || !mapRef.current || !isLoaded || !userLocation) return;

    const map = new google.maps.Map(mapRef.current, {
      zoom: 17,
      center: userLocation,
      disableDefaultUI: true,
      mapTypeControl: false,
    });

    setMapInstance(map);

    const marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      draggable: true,
      title: "Selected Location",
    });

    const geocoder = new google.maps.Geocoder();

    const updateLocationName = (location: google.maps.LatLng) => {
      geocoder.geocode({ location }, (results, status) => {
        if (
          status === google.maps.GeocoderStatus.OK &&
          results &&
          results[0]
        ) {
          setSelectedLocationName(results[0].formatted_address);
        }
      });
    };

    // Initial geocoding for user location
    updateLocationName(new google.maps.LatLng(userLocation.lat, userLocation.lng));

    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      if (position) {
        map.setCenter(position);
        updateLocationName(position);
      }
    });

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      const clickedLocation = e.latLng;
      if (clickedLocation) {
        marker.setPosition(clickedLocation);
        map.setCenter(clickedLocation);
        updateLocationName(clickedLocation);
      }
    });
  }, [showMap, isLoaded, userLocation]);

  const handleSelectPrediction = (placeId: string) => {
    if (!isLoaded) return;

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails({ placeId }, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place?.geometry?.location
      ) {
        if (mapInstance) {
          mapInstance.setCenter(place.geometry.location);
          mapInstance.setZoom(17);
        }
        onSelect(place.formatted_address || place.name || "");
        onClose();
        setPredictions([]);
        setSearchQuery("");
      }
    });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              if (
                status === google.maps.GeocoderStatus.OK &&
                results &&
                results[0]
              ) {
                onSelect(results[0].formatted_address);
                onClose();
              }
            }
          );
        },
        () => {
          onSelect("Current Location");
          onClose();
        }
      );
    } else {
      onSelect("Current Location");
      onClose();
    }
  };

  const handleMapDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!mapRef.current || !isDragging) return;

    const rect = mapRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPinPosition({
      x: Math.max(10, Math.min(90, x)),
      y: Math.max(10, Math.min(90, y)),
    });
  };

  const handleConfirmPin = () => {
    onSelect(selectedLocationName);
    onClose();
    setShowMap(false);
  };

  const filteredLocations = savedLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSearches = recentSearches.filter((search) =>
    search.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-0 pb-0">
        <DialogHeader className="px-4">
          <DialogTitle>Set pickup</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px] overflow-x-visible">
          <div className="p-4">
            {!showMap ? (
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search for a place..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>

                {/* Search Predictions */}
                {predictions.length > 0 && (
                  <div className="space-y-2 border-b">
                    {predictions.map((prediction) => (
                      <Button
                        key={prediction.place_id}
                        variant="ghost"
                        className="flex items-center gap-3 hover:bg-secondary w-full h-[unset] text-left transition-colors justify-start px-3 py-2"
                        onClick={() => handleSelectPrediction(prediction.place_id)}
                      >
                        <MapPin className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {prediction.description}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {/* Use Current Location */}
                <Button
                  onClick={handleUseCurrentLocation}
                  disabled={isLoadingLocation}
                  variant="outline"
                  className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors disabled:opacity-50"
                >
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                    {isLoadingLocation ? (
                      <Loader className="w-5 h-5 text-primary animate-spin" />
                    ) : (
                      <Navigation className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">
                      Use Current Location
                    </p>
                    <p className="font-medium text-foreground">
                      {isLoadingLocation
                        ? "Getting location..."
                        : userLocation
                          ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
                          : "GPS location"}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMap(true)}
                  className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
                >
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">Pick on map</p>
                    <p className="font-medium text-foreground">
                      {userLocation
                        ? "Drag pin or click to set location"
                        : "Loading location..."}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Button>
                {/* Saved Locations */}
                {filteredLocations.length > 0 && (
                  <div>
                    <p className="flex items-center gap-2 mb-3 font-medium text-muted-foreground text-sm">
                      <Star className="w-4 h-4" />
                      Saved Places
                    </p>
                    <div className="space-y-4">
                      {filteredLocations.map((loc) => (
                        <Button
                          key={loc.id}
                          variant="outline"
                          onClick={() => {
                            onSelect(loc.address);
                            onClose();
                          }}
                          className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
                        >
                          <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                            <Star className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-muted-foreground text-xs">
                              {loc.address}
                            </p>
                            <p className="font-medium text-foreground">
                              {loc.name}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Searches */}
                {filteredSearches.length > 0 && (
                  <div>
                    <p className="flex items-center gap-2 mb-3 font-medium text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      Recent
                    </p>
                    <div className="space-y-4">
                      {filteredSearches.map((search, index) => (
                        <Button
                          key={search + index}
                          variant="outline"
                          onClick={() => {
                            onSelect(search);
                            onClose();
                          }}
                          className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
                        >
                          <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                            <Star className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {search}
                            </p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Map View */
              <div className="flex flex-col h-[calc(100vh-73px)]">
                {!isLoaded ? (
                  <div className="flex flex-col items-center justify-center flex-1 bg-secondary">
                    <Loader className="w-8 h-8 animate-spin text-primary" />
                    <p className="mt-2 text-muted-foreground text-sm">
                      Loading map...
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      ref={mapRef}
                      className="relative flex-1 bg-secondary"
                      style={{ minHeight: "300px" }}
                    />

                    {/* Confirm Button */}
                    <div className="safe-bottom bg-card p-4 border-border border-t">
                      <div className="mb-3 text-center">
                        <p className="text-muted-foreground text-sm">
                          Selected location
                        </p>
                        <p className="font-medium text-foreground line-clamp-2">
                          {selectedLocationName}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 pt-0">
          {showMap ? (
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowMap(false)}
              >
                Back
              </Button>
              <Button className="flex-1" onClick={handleConfirmPin}>
                Confirm Location
              </Button>
            </div>
          ) : (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => {
                onSelect("");
                onClose();
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
