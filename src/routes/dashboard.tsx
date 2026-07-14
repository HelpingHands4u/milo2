import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Bot, MessageSquare, Sparkles, Users, BookOpen, ArrowRight, Upload } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — Student ChatBot AI" }] }),
});

const activity = [
  { icon: MessageSquare, text: "You asked AI about integration by parts", time: "2h ago" },
  { icon: Users, text: "Priya K. accepted your mentorship request", time: "Yesterday" },
  { icon: BookOpen, text: "New notes uploaded in Data Structures", time: "2 days ago" },
];

const announcements = [
  { title: "Mid-term schedule released", by: "Dr. R. Menon", when: "Today" },
  { title: "Physics lab rescheduled to Friday", by: "Dr. A. Iyer", when: "1 day ago" },
];

const suggestions = [
  "Summarize my last Physics notes",
  "Explain Big-O with examples",
  "Give me 5 practice questions on derivatives",
];

const mentors = [
  { name: "Priya K.", area: "Web Development" },
  { name: "Arjun R.", area: "Machine Learning" },
  { name: "Sara T.", area: "Economics" },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">Welcome back, Alex 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">Here's what's happening in your workspace today.</p>
          </div>
          <Button asChild>
            <Link to="/chat"><Bot className="mr-1 h-4 w-4" /> Ask AI</Link>
          </Button>
        </header>

        {/* Quick actions */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MessageSquare, label: "Ask AI", to: "/chat" as const },
            { icon: Users, label: "Find Mentor", to: "/mentors" as const },
            { icon: BookOpen, label: "My Notes", to: "/dashboard" as const },
            { icon: Upload, label: "Submit Work", to: "/lecturer" as const },
          ].map((a) => (
            <Link key={a.label} to={a.to} className="group">
              <Card className="border-border transition hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-sm font-medium">{a.label}</div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((a) => (
                <div key={a.title} className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">by {a.by}</div>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-4 w-4 text-accent" /> AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestions.map((s) => (
                <Link key={s} to="/chat" className="block rounded-lg border border-border p-3 text-sm hover:border-primary/40 hover:bg-primary-soft">
                  {s}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm">{a.text}</div>
                    <div className="text-xs text-muted-foreground">{a.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommended Mentors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mentors.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft font-semibold text-primary">
                    {m.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{m.name}</div>
                    <Badge variant="secondary" className="mt-0.5 text-xs">{m.area}</Badge>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link to="/mentors">View all mentors</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
