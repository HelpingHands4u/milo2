import { useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

export default function LocationTracker() {
  useEffect(() => {
    if (!auth.currentUser) return;

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        try {
          await updateDoc(
            doc(db, "users", auth.currentUser!.uid),
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              online: true,
              lastSeen: serverTimestamp(),
            }
          );
        } catch (e) {
          console.log(e);
        }
      },
      console.error,
      {
     enableHighAccuracy: true,
     maximumAge: 0,
     timeout: 10000,
    }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return null;
}