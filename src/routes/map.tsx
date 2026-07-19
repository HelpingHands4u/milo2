import { createFileRoute } from "@tanstack/react-router";
import { APIProvider, Map, AdvancedMarker, useMap, Pin } from "@vis.gl/react-google-maps";
import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/map")({
  component: CampusMap,
});

const center = {
  lat: 22.7317737,
  lng: 88.4992791,
};
function FlyToLocation({ selectedBuilding }: { selectedBuilding: string }) {
  const map = useMap();

  if (!map || !selectedBuilding) return null;

  const place = campusLocations.find(
    (p) => p.name === selectedBuilding
  );

  if (place) {
    map.panTo(place.position);
    map.setZoom(20);
  }

  return null;
}

const campusLocations = [
  {
    id: 1,
    name: "University Building 1 (UB1)",
    position: { lat: 22.731820, lng: 88.499280 },
    plusCode: "PFJX+PQ",
    description: "Main Academic Building",
  },
  {
    id: 2,
    name: "University Building 2 (UB2)",
    position: { lat: 22.731950, lng: 88.499520 },
    plusCode: "PFJX+MVP",
    description: "Lecture Halls",
  },
  {
    id: 3,
    name: "University Building 3 (UB3)",
    position: { lat: 22.7317737, lng: 88.4992791 },
    plusCode: "PFJX+RR9",
    description: "Administration Building",
  },
  {
    id: 4,
    name: "University Building 4 (UB4)",
    position: { lat: 22.7317737, lng: 88.4992791 },
    plusCode: "PFJX+MVP",
    description: "Administration Building",
  },
  {
    id: 5,
    name: "University Building 5 (UB5)",
    position: { lat: 22.731450, lng: 88.498980 },
    plusCode: "PFJX+4QC",
    description: "Laboratories",
  },
   {
    id: 6,
    name: "University Building 6 (UB6)",
    position: { lat: 22.731450, lng: 88.498980 },
    plusCode: "PFJX+CG",
    description: "Laboratories",
  },
  {
    id: 7,
    name: "Brainware Canteen",
    position: { lat: 22.732150, lng: 88.499470 },
    plusCode: "PFJX+VF6",
    description: "Food Court",
  },
  {
    id: 8,
    name: "Brainware Main Gate",
    position: { lat: 22.731150, lng: 88.499150 },
    plusCode: "PFJX+XX",
    description: "Main Entrance",
  },
];
const buildingList = [
  "Main Gate",
  "Academic Block",
  "Library",
  "Canteen",
  "Parking",
];
function FollowMe({
  location,
}: {
  location: { latitude: number; longitude: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !location) return;

    map.panTo({
      lat: location.latitude,
      lng: location.longitude,
    });

    map.setZoom(20);
  }, [location?.latitude, location?.longitude]);

  return null;
}
function CampusMap() {
 const [selectedBuilding, setSelectedBuilding] = useState("");
 const location = useLocation();useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  );

  return unsubscribe;
}, []);
 const [users, setUsers] = useState<any[]>([]);
 const selectedPlace = campusLocations.find(
  (p) => p.name === selectedBuilding
);
 const [search, setSearch] = useState("");
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-4 text-3xl font-bold">
          Brainware University Campus Map
        </h1>

        <div className="grid grid-cols-4 gap-4">

  {/* Left Sidebar */}
  <div className="rounded-xl border p-4 bg-white shadow">

   <Input
  placeholder="Search Building..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="mb-4"
/>

    <h2 className="font-bold mb-3">
      Campus Buildings
    </h2>

    {buildingList
  .filter((building) =>
    building.toLowerCase().includes(search.toLowerCase())
  )
  .map((building) => (
      <button
        key={building}
        onClick={() => setSelectedBuilding(building)}
        className="block w-full rounded-lg p-2 text-left hover:bg-blue-100"
      >
        {building}
      </button>
    ))}

{selectedPlace && (
  <div className="mt-5 rounded-lg border p-3 bg-gray-50">
    <h3 className="font-bold text-lg">
      {selectedPlace.name}
    </h3>

    <p className="text-sm text-gray-600">
      {selectedPlace.description}
    </p>

    <p className="mt-2 text-xs">
      📍 {selectedPlace.plusCode}
    </p>
  </div>
)}
  </div>

{/* Google Map */}
<div
  className="col-span-3"
  style={{
    height: "80vh",
    borderRadius: "12px",
    overflow: "hidden",
  }}
>
  <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
    <Map
  center={
    location
      ? {
          lat: location.latitude,
          lng: location.longitude,
        }
      : center
  }
      defaultCenter={center}
      defaultZoom={19}
      mapId="cadd3747dd38eb48d7ade084"
      mapTypeId="satellite"
      gestureHandling="greedy"
    >
      <FlyToLocation selectedBuilding={selectedBuilding} />
      <FollowMe location={location} />
      {location && (
  <AdvancedMarker
    position={{
      lat: location.latitude,
      lng: location.longitude,
    }}
    title="You"
  >
    <Pin
      background="#0ea5e9"
      borderColor="#0284c7"
      glyphColor="white"
    />
  </AdvancedMarker>
)}
{users
  .filter(
    (u) =>
      u.latitude &&
      u.longitude &&
      u.id !== auth.currentUser?.uid
  )
  .map((u) => (
    <AdvancedMarker
      key={u.id}
      position={{
        lat: u.latitude,
        lng: u.longitude,
      }}
    >
      <div
        style={{
          background: "#16a34a",
          color: "white",
          padding: "5px 10px",
          borderRadius: "10px",
          fontWeight: "bold",
        }}
      >
        {u.name}
      </div>
    </AdvancedMarker>
  ))}
      {campusLocations.map((place) => (
        <AdvancedMarker
          key={place.id}
          position={place.position}
          title={place.name}
        >
          <div
            style={{
              background: "#2563eb",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {place.name}
          </div>
        </AdvancedMarker>
      ))}
    </Map>
  </APIProvider>
</div>
  {/* Google Map */}
 
        </div>
      </div>
    </AppShell>
  );
}