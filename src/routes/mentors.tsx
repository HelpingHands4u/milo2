import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MessageSquare, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
  head: () => ({ meta: [{ title: "Senior Mentors — Student ChatBot AI" }] }),
});
function MentorsPage() {
  const [q, setQ] = useState("");
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [seniors, setSeniors] = useState<any[]>([]);

 const filtered = seniors.filter((m: any) => {
  const t = `${m.name} ${m.department} ${m.skills?.join(" ") || ""}`.toLowerCase();

  return t.includes(q.toLowerCase());
});
  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "seniors"),
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSeniors(list);
    }
  );

  return () => unsubscribe();
}, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">Senior Mentors</h1>
          <p className="mt-1 text-sm text-muted-foreground">Find someone who's been where you are — and get a nudge in the right direction.</p>
        </header>

        <div className="relative mt-6 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, branch or skill…"
            className="pl-9"
          />
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <Card key={m.id} className="border-border transition hover:var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                 <div className="relative shrink-0">
                  <img
                    src={m.photo || "https://i.pravatar.cc/150"}
                    alt={m.name}
                    className="h-14 w-14 rounded-full object-cover border"
                   />

                  <span
                   className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${
                  m.online ? "bg-green-500" : "bg-gray-400"
                   }`}
                  />

                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-semibold">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.year} · {m.department}</div>
                    <div
                        className={`mt-1 text-xs font-medium ${
                        m.online ? "text-green-600" : "text-gray-500"
                           }`}
                           >
                        {m.online ? "🟢 Online" : "⚫ Offline"}
                      </div>
                        {!m.online && m.lastSeen && (
                        <div className="text-xs text-muted-foreground">
                        Last seen recently
                        </div>
                         )}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {Array.isArray(m.skills) &&
                     m.skills.map((s: string) => (
                     <Badge key={s} variant="secondary" className="text-xs">
                     {s}
                    </Badge>
                      ))}
                  
                </div>
                 <div className="mt-4 flex gap-2">
  {/* Connect Button */}
  <Button
    size="sm"
    className="flex-1"
    variant={connected[m.name] ? "outline" : "default"}
    onClick={() =>
      setConnected((c) => ({
        ...c,
        [m.name]: !c[m.name],
      }))
    }
  >
    {connected[m.name] ? (
      <>
        <Check className="mr-1 h-4 w-4" />
        Requested
      </>
    ) : (
      "Connect"
    )}
  </Button>

  {/* Chat Button */}
  <Button asChild size="sm" variant="outline">
    <Link to="/chat/$mentorId" params={{ mentorId: m.id }}>
        <MessageSquare className="h-4 w-4" />
    </Link>
  </Button>
</div>
                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}