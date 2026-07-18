import { createFileRoute } from "@tanstack/react-router";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/map")({
  component: CampusMap,
});

const center = {
  lat: 22.7317737,
  lng: 88.4992791,
};

function CampusMap() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl p-6">
        <h1 className="mb-4 text-3xl font-bold">
          Brainware University Campus Map
        </h1>

        <div
          style={{
            width: "100%",
            height: "80vh",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Map
                 defaultCenter={center}
                 defaultZoom={19}
                 mapId="YOUR_MAP_ID"
                 mapTypeId="hybrid"
                />
              <AdvancedMarker position={center}>
                <Pin
                  background="#2563eb"
                  borderColor="#1d4ed8"
                  glyphColor="white"
                />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      </div>
    </AppShell>
  );
}