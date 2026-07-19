import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import LocationTracker from "./LocationTracker";

export function AppShell({
  children,
  hideFooter,
}: {
  children: ReactNode;
  hideFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LocationTracker />   {/* <-- ADD THIS */}

      <SiteHeader />

      <main className="flex-1">
        {children}
      </main>

      {!hideFooter && <SiteFooter />}
    </div>
  );
}