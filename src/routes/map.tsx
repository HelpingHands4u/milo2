import { createFileRoute } from "@tanstack/react-router";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import { AppShell } from "@/components/app-shell";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/hooks/useLocation";

import { useState, useMemo } from "react";
const buildings = [
  {
    id: 1,
    name: "University Building 1",
    description: "Academic Block",
    position: {
      lat: 22.731820,
      lng: 88.499280,
    },
  },

  {
    id: 2,
    name: "University Building 2",
    description: "Lecture Hall",
    position: {
      lat: 22.731950,
      lng: 88.499520,
    },
  },

  {
    id: 3,
    name: "University Building 3",
    description: "Administration",
    position: {
      lat: 22.7317737,
      lng: 88.4992791,
    },
  },

  {
    id: 4,
    name: "University Building 4",
    description: "Labs",
    position: {
      lat: 22.731650,
      lng: 88.499180,
    },
  },

  {
    id: 5,
    name: "University Building 5",
    description: "Engineering Block",
    position: {
      lat: 22.731450,
      lng: 88.498980,
    },
  },

  {
    id: 6,
    name: "University Building 6",
    description: "Seminar Hall",
    position: {
      lat: 22.731320,
      lng: 88.498860,
    },
  },

  {
    id: 7,
    name: "Brainware Canteen",
    description: "Food Court",
    position: {
      lat: 22.732150,
      lng: 88.499470,
    },
  },

  {
    id: 8,
    name: "Main Gate",
    description: "University Entrance",
    position: {
      lat: 22.731150,
      lng: 88.499150,
    },
  },
];
function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return Math.round(
    R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
}

export const Route = createFileRoute("/map")({
  component: CampusMap,
});

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const defaultCenter = {
  lat: 22.7317737,
  lng: 88.4992791,
};
function CampusMap() {

  const location = useLocation();

  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<
    (typeof buildings)[0] | null
  >(null);

  const filtered = useMemo(() => {
    return buildings.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <AppShell>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-5">
          Brainware University Smart Map
        </h1>

        <div className="grid grid-cols-4 gap-5">

          {/* Sidebar */}

          <div className="rounded-xl border p-4 bg-white shadow">

            <Input
              placeholder="Search Building..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mt-5 space-y-2">

              {filtered.map((building) => (

                <button
                  key={building.id}
                  className="block w-full rounded-lg border p-3 text-left hover:bg-blue-100"
                  onClick={() => setSelected(building)}
                >
                  {building.name}
                </button>

              ))}

            </div>

          </div>

          {/* Map */}

        <div
  className="col-span-3"
  style={{
    height: "80vh",
    borderRadius: "15px",
    overflow: "hidden",
  }}
>
  <APIProvider apiKey={apiKey}>
    <Map
      defaultCenter={defaultCenter}
      defaultZoom={18}
      gestureHandling="greedy"
      mapId="cadd3747dd38eb48d7ade084"
    >

      {/* Your Live Location */}
      {location && (
        <AdvancedMarker
          position={{
            lat: Number(location.latitude),
            lng: Number(location.longitude),
          }}
        >
          <Pin
            background="#0ea5e9"
            borderColor="#0284c7"
            glyphColor="white"
          />
        </AdvancedMarker>
      )}

      {/* Building Markers */}
      {buildings.map((building) => (
        <AdvancedMarker
          key={building.id}
          position={building.position}
          onClick={() => setSelected(building)}
        >
          <Pin
            background="#2563eb"
            glyphColor="white"
          />
        </AdvancedMarker>
      ))}

      {/* Selected Building Popup */}
      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ minWidth: "220px" }}>
            <h3
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              {selected.name}
            </h3>

            <p>{selected.description}</p>

            {location && (
              <p
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Distance:
                {" "}
                {getDistance(
                  location.latitude,
                  location.longitude,
                  selected.position.lat,
                  selected.position.lng
                )}
                {" "}meters
              </p>
            )}

            <button
              style={{
                marginTop: "12px",
                background: "#2563eb",
                color: "white",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
              }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${selected.position.lat},${selected.position.lng}`,
                  "_blank"
                )
              }
            >
              Navigate
            </button>
          </div>
        </InfoWindow>
      )}

    </Map>
  </APIProvider>
</div>

        </div>
      </div>
    </AppShell>
  );
}