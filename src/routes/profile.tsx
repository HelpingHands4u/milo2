import { createFileRoute } from "@tanstack/react-router";
import { Award, Edit3, Mail, MapPin, Trophy, Sparkles, Flame } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "Profile — Student ChatBot AI" }] }),
});

const skills = ["Python", "React", "Statistics", "UI Design", "Public Speaking"];
const achievements = [
  { title: "Top 5% AI Learner", desc: "Consistently high engagement with AI study sessions." },
  { title: "Coding Champion", desc: "Winner — Spring Hackathon 2025." },
  { title: "Mentor's Choice", desc: "Recognized by 3 senior mentors." },
];
const badges = [
  { icon: Flame, label: "30-day Streak", tone: "text-accent bg-accent-soft" },
  { icon: Sparkles, label: "Curious Mind", tone: "text-primary bg-primary-soft" },
  { icon: Trophy, label: "Hackathon Winner", tone: "text-accent bg-accent-soft" },
  { icon: Award, label: "Top Contributor", tone: "text-primary bg-primary-soft" },
];

function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Card className="overflow-hidden border-border">
          <div className="h-28 bg-gradient-to-r from-primary to-accent" />
          <CardContent className="p-6 sm:p-8">
            <div className="-mt-16 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:flex sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-4 border-card bg-primary-soft text-2xl font-bold text-primary">
                  AK
                </div>
                <div className="min-w-0 pb-1">
                  <h1 className="truncate text-xl font-bold sm:text-2xl">Alex Kumar</h1>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> alex@university.edu</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Bengaluru, India</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0"><Edit3 className="mr-1 h-4 w-4" /> Edit</Button>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Third-year CS student passionate about AI, product design and mentoring juniors. Currently exploring reinforcement learning.
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Skills</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Contribution Badges</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {badges.map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 text-center">
                    <div className={`grid h-10 w-10 place-items-center rounded-full ${b.tone}`}>
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div className="text-xs font-medium">{b.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader><CardTitle className="text-base">Achievements</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((a) => (
                <div key={a.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{a.title}</div>
                    <div className="text-sm text-muted-foreground">{a.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
