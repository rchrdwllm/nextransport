import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Navigation,
  Search,
  MapPin,
  Clock,
  Star,
  GripVertical,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { savedLocations, recentSearches } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

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
  const mapRef = useRef<HTMLDivElement>(null);

  const handleUseCurrentLocation = () => {
    onSelect("Current Location");
    onClose();
  };

  const handleSearchSelect = (location: string) => {
    onSelect(location);
    onClose();
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
    // Simulate reverse geocoding
    const locations = [
      "EDSA Taft, Pasay City",
      "Ayala Avenue, Makati",
      "BGC Central, Taguig",
      "Quezon Avenue, QC",
    ];
    const randomLocation =
      locations[Math.floor(Math.random() * locations.length)];

    onSelect(randomLocation);
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
                    placeholder="Search for a place..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    autoFocus
                  />
                </div>
                {/* Use Current Location */}
                <Button
                  onClick={handleUseCurrentLocation}
                  variant="outline"
                  className="flex items-center gap-3 hover:border-primary/30 w-full h-[unset] text-left transition-colors"
                >
                  <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">
                      Use Current Location
                    </p>
                    <p className="font-medium text-foreground">
                      GPS location detected
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
                      Drag pin to set location
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
                <div
                  ref={mapRef}
                  className="relative flex-1 bg-secondary cursor-crosshair"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleMapDrag}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  onTouchMove={handleMapDrag}
                >
                  {/* Simulated Map */}
                  <svg
                    viewBox="0 0 400 400"
                    className="opacity-30 w-full h-full"
                  >
                    {/* Grid pattern */}
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Roads */}
                    <path
                      d="M0 200 L400 200"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="8"
                      opacity="0.3"
                    />
                    <path
                      d="M200 0 L200 400"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="8"
                      opacity="0.3"
                    />
                    <path
                      d="M100 0 L100 400"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="4"
                      opacity="0.2"
                    />
                    <path
                      d="M300 0 L300 400"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="4"
                      opacity="0.2"
                    />
                  </svg>

                  {/* Draggable Pin */}
                  <motion.div
                    className="z-10 absolute pointer-events-none"
                    style={{
                      left: `${pinPosition.x}%`,
                      top: `${pinPosition.y}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                    animate={{ scale: isDragging ? 1.2 : 1 }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center items-center bg-primary shadow-glow rounded-full w-10 h-10">
                        <MapPin className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div className="bg-primary shadow-lg -mt-1.5 rounded-full w-3 h-3" />
                    </div>
                  </motion.div>

                  {/* Drag hint */}
                  <div className="top-4 left-1/2 absolute flex items-center gap-2 bg-card/90 shadow-lg backdrop-blur-sm px-4 py-2 rounded-full -translate-x-1/2">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-sm">
                      Drag to move pin
                    </span>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="safe-bottom bg-card p-4 border-border border-t">
                  <div className="mb-3 text-center">
                    <p className="text-muted-foreground text-sm">
                      Selected location
                    </p>
                    <p className="font-medium text-foreground">
                      Near EDSA, Metro Manila
                    </p>
                  </div>
                </div>
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
