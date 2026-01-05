// Mock data for NexTransport

export const mockUser = {
    id: "user-1",
    firstName: "Juan",
    lastName: "Dela Cruz",
    balance: 250.0,
    mobile: "0917****123",
    avatar: null,
};

export const mockRiders = [
    {
        id: "rider-1",
        name: "Juan Dela Cruz",
        rating: 4.8,
        trips: 1243,
        vehicle: "Honda ADV150",
        vehicleColor: "Black",
        plateNumber: "ABC 1234",
        avatar: null,
        eta: 3,
        distance: 0.4,
        price: 145,
    },
    {
        id: "rider-2",
        name: "Maria Santos",
        rating: 4.9,
        trips: 876,
        vehicle: "Yamaha NMAX",
        vehicleColor: "Blue",
        plateNumber: "XYZ 5678",
        avatar: null,
        eta: 5,
        distance: 0.8,
        price: 155,
    },
    {
        id: "rider-3",
        name: "Pedro Reyes",
        rating: 4.6,
        trips: 2105,
        vehicle: "Honda Click 160",
        vehicleColor: "Red",
        plateNumber: "DEF 9012",
        avatar: null,
        eta: 7,
        distance: 1.2,
        price: 138,
    },
];

export const rideTypes = [
    { id: "jeepney", label: "Jeepney", icon: "🚐", price: 12 },
    { id: "bus", label: "Bus", icon: "🚌", price: 15 },
    { id: "motor", label: "Motor", icon: "🏍️", price: 145 },
    { id: "taxi", label: "Taxi", icon: "🚕", price: 250 },
    { id: "grab", label: "Grab", icon: "🚗", price: 180 },
];

export const trafficCorridors = [
    { name: "EDSA", status: "heavy", waitTime: "15-25 mins" },
    { name: "C5", status: "moderate", waitTime: "8-15 mins" },
    { name: "SLEX", status: "light", waitTime: "3-8 mins" },
    { name: "Ortigas Ave", status: "moderate", waitTime: "10-18 mins" },
];

export const savedLocations = [
    { id: "loc-1", name: "Home", address: "123 Barangay San Antonio, Makati" },
    { id: "loc-2", name: "Work", address: "Ayala Avenue, Makati CBD" },
    { id: "loc-3", name: "Gym", address: "SM Megamall, Ortigas" },
];

export const recentSearches = [
    "Makati CBD",
    "BGC High Street",
    "SM Mall of Asia",
    "Quezon City Circle",
    "Ortigas Center",
];
