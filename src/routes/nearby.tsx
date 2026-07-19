import { createFileRoute } from "@tanstack/react-router";
import { useLocation } from "@/hooks/useLocation";

export const Route = createFileRoute("/nearby")({
  component: NearbyPage,
});

function NearbyPage() {
  const location = useLocation();
  console.log(location);

  if (!location) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Nearby Students</h1>

        <p className="mt-4">
          Getting your location...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Nearby Students
      </h1>

      <div className="mt-6 rounded-lg border p-4">
        <h2 className="font-semibold">Your Current Location</h2>

        <p className="mt-2">
          Latitude: {location.latitude}
        </p>

        <p>
          Longitude: {location.longitude}
        </p>
      </div>
    </div>
  );
}