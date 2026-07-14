import { createFileRoute } from "@tanstack/react-router";
import { Bell, FileUp, MessageCircleQuestion, TrendingUp, Plus } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/lecturer")({
  component: LecturerDashboard,
  head: () => ({ meta: [{ title: "Lecturer Dashboard — Student ChatBot AI" }] }),
});

const queries = [
  { student: "Meera P.", question: "Could you clarify the assumptions in Q3 of the assignment?", course: "Physics 201" },
  { student: "Rohan V.", question: "When is the make-up class scheduled?", course: "Physics 201" },
  { student: "Aditi S.", question: "Is the reading list on Moodle updated?", course: "Modern History" },
];

const engagement = [
  { label: "Active students", value: "184" },
  { label: "Notes downloaded", value: "1,240" },
  { label: "Open queries", value: "12" },
  { label: "Avg. engagement", value: "78%" },
];

function LecturerDashboard() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">Lecturer Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">Post announcements, share materials and stay close to your students.</p>
          </div>
          <Button><Plus className="mr-1 h-4 w-4" /> New Announcement</Button>
        </header>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {engagement.map((e) => (
            <Card key={e.label}>
              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground">{e.label}</div>
                <div className="mt-1 text-2xl font-bold text-primary">{e.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4 text-primary" /> Post an Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Title (e.g., Mid-term schedule released)" />
              <Textarea placeholder="Share details with your class…" rows={4} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="secondary">Physics 201</Badge>
                <Button size="sm">Publish</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><FileUp className="h-4 w-4 text-accent" /> Upload Notes / Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground hover:border-primary/40 hover:bg-primary-soft/40">
                <FileUp className="h-6 w-6 text-primary" />
                <div><span className="font-medium text-foreground">Click to upload</span> or drag &amp; drop</div>
                <div className="text-xs">PDF, DOCX up to 20MB</div>
                <input type="file" className="hidden" />
              </label>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><MessageCircleQuestion className="h-4 w-4 text-primary" /> Student Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {queries.map((q, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{q.student}</div>
                    <Badge variant="secondary" className="text-xs">{q.course}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{q.question}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">Reply</Button>
                    <Button size="sm" variant="ghost">Mark resolved</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4 text-accent" /> Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-end gap-2">
                {[40, 65, 50, 80, 72, 90, 78].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/80" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
