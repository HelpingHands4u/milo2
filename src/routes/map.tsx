import { createFileRoute } from "@tanstack/react-router";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/map")({
  component: CampusMap,
});

const center = {
  lat: 22.7317737,
  lng: 88.4992791,
};

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function CampusMap() {
  return (
    <AppShell>
      <div className="p-6">
        <h1 className="mb-4 text-3xl font-bold">
          Brainware University Campus Map
        </h1>

        <div
          style={{
            height: "80vh",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {!apiKey ? (
            <div className="flex h-full items-center justify-center">
              Google Maps API Key Missing
            </div>
          ) : (
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={center}
                defaultZoom={18}
                gestureHandling="greedy"
                mapId="cadd3747dd38eb48d7ade084"
              />
            </APIProvider>
          )}
        </div>
      </div>
    </AppShell>
  );
}