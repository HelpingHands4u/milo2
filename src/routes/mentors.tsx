import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MessageSquare, Check } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/mentors")({
  component: MentorsPage,
  head: () => ({ meta: [{ title: "Senior Mentors — Student ChatBot AI" }] }),
});

const mentors = [
  { name: "Priya Krishnan", year: "Final Year", branch: "CS", bio: "Full-stack developer, hackathon mentor.", skills: ["React", "Node.js", "System Design"] },
  { name: "Arjun Rao", year: "3rd Year", branch: "ECE", bio: "ML enthusiast building side projects.", skills: ["Python", "ML", "PyTorch"] },
  { name: "Sara Thomas", year: "Final Year", branch: "Economics", bio: "Loves teaching microeconomics.", skills: ["Micro", "Macro", "Statistics"] },
  { name: "Vikram Singh", year: "Postgrad", branch: "Physics", bio: "Quantum mechanics & problem solving.", skills: ["Physics", "Math", "LaTeX"] },
  { name: "Neha Verma", year: "3rd Year", branch: "Design", bio: "UI/UX, portfolio reviews welcome.", skills: ["Figma", "UI Design", "Research"] },
  { name: "Karan Patel", year: "Final Year", branch: "Business", bio: "Case competitions & career prep.", skills: ["Case Prep", "Excel", "Consulting"] },
];

function MentorsPage() {
  const [q, setQ] = useState("");
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const filtered = mentors.filter((m) => {
    const t = `${m.name} ${m.branch} ${m.skills.join(" ")}`.toLowerCase();
    return t.includes(q.toLowerCase());
  });

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
            <Card key={m.name} className="border-border transition hover:shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-soft text-lg font-semibold text-primary">
                    {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-semibold">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.year} · {m.branch}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    variant={connected[m.name] ? "outline" : "default"}
                    onClick={() => setConnected((c) => ({ ...c, [m.name]: !c[m.name] }))}
                  >
                    {connected[m.name] ? <><Check className="mr-1 h-4 w-4" /> Requested</> : "Connect"}
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
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
