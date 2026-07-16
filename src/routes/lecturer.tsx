import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, FileUp, MessageCircleQuestion, TrendingUp, Plus, Check, X, Send } from "lucide-react";
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

type Query = {
  student: string;
  question: string;
  course: string;
  resolved?: boolean;
  reply?: string;
  replyOpen?: boolean;
};

const initialQueries: Query[] = [
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

type Announcement = { title: string; body: string; course: string; when: string };

function LecturerDashboard() {
  const [queries, setQueries] = useState<Query[]>(initialQueries);
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { title: "Mid-term schedule released", body: "Please check the portal for exam dates.", course: "Physics 201", when: "Today" },
    { title: "Physics lab rescheduled to Friday", body: "Room change: Lab 4B → Lab 2A.", course: "Physics 201", when: "1 day ago" },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);

  const handlePublish = () => {
    if (!newTitle.trim() && !newBody.trim()) return;
    const now = new Date();
    const when = "Just now";
    setAnnouncements((prev) => [
      { title: newTitle || "Untitled Announcement", body: newBody, course: "Physics 201", when },
      ...prev,
    ]);
    setNewTitle("");
    setNewBody("");
    setPublishSuccess(true);
    setShowNewAnnouncement(false);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  const toggleReply = (idx: number) => {
    setQueries((q) =>
      q.map((item, i) => (i === idx ? { ...item, replyOpen: !item.replyOpen, reply: item.reply ?? "" } : item))
    );
  };

  const sendReply = (idx: number) => {
    setQueries((q) =>
      q.map((item, i) => (i === idx ? { ...item, replyOpen: false, resolved: true } : item))
    );
  };

  const markResolved = (idx: number) => {
    setQueries((q) => q.map((item, i) => (i === idx ? { ...item, resolved: true, replyOpen: false } : item)));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file.name);
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">Lecturer Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Post announcements, share materials and stay close to your students.
            </p>
          </div>
          <Button onClick={() => setShowNewAnnouncement((v) => !v)}>
            <Plus className="mr-1 h-4 w-4" /> New Announcement
          </Button>
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
          {/* Announcement form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" /> Post an Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {publishSuccess && (
                <div className="flex items-center gap-2 rounded-lg bg-accent-soft px-3 py-2.5 text-sm text-accent">
                  <Check className="h-4 w-4" /> Announcement published successfully!
                </div>
              )}
              <Input
                placeholder="Title (e.g., Mid-term schedule released)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Textarea
                placeholder="Share details with your class…"
                rows={4}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge variant="secondary">Physics 201</Badge>
                <Button
                  size="sm"
                  onClick={handlePublish}
                  disabled={!newTitle.trim() && !newBody.trim()}
                >
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* File upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileUp className="h-4 w-4 text-accent" /> Upload Notes / Assignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center text-sm text-muted-foreground hover:border-primary/40 hover:bg-primary-soft/40 transition-colors">
                <FileUp className="h-6 w-6 text-primary" />
                {uploadedFile ? (
                  <div>
                    <span className="font-medium text-accent">✓ {uploadedFile}</span>
                    <div className="mt-1 text-xs">Click to upload a different file</div>
                  </div>
                ) : (
                  <div>
                    <span className="font-medium text-foreground">Click to upload</span> or drag &amp; drop
                  </div>
                )}
                <div className="text-xs">PDF, DOCX up to 20MB</div>
                <input type="file" className="hidden" accept=".pdf,.docx,.doc" onChange={handleFileUpload} />
              </label>
            </CardContent>
          </Card>

          {/* Announcements list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" /> Posted Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.length === 0 && (
                <p className="text-sm text-muted-foreground">No announcements yet.</p>
              )}
              {announcements.map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-4 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{a.title}</div>
                    {a.body && <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{a.body}</div>}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student queries */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageCircleQuestion className="h-4 w-4 text-primary" /> Student Queries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {queries.map((q, i) => (
                <div key={i} className={`rounded-lg border p-4 transition-colors ${q.resolved ? "border-accent/30 bg-accent-soft/40" : "border-border"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">{q.student}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{q.course}</Badge>
                      {q.resolved && (
                        <Badge variant="outline" className="border-accent/40 text-xs text-accent">Resolved</Badge>
                      )}
                    </div>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{q.question}</p>

                  {q.replyOpen && !q.resolved && (
                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Type your reply…"
                        rows={2}
                        value={q.reply ?? ""}
                        onChange={(e) =>
                          setQueries((prev) =>
                            prev.map((item, idx) => (idx === i ? { ...item, reply: e.target.value } : item))
                          )
                        }
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => sendReply(i)} disabled={!q.reply?.trim()}>
                          <Send className="mr-1 h-3.5 w-3.5" /> Send Reply
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => toggleReply(i)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {!q.resolved && !q.replyOpen && (
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => toggleReply(i)}>
                        Reply
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => markResolved(i)}>
                        Mark resolved
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Engagement chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-accent" /> Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-32 items-end gap-2">
                {[40, 65, 50, 80, 72, 90, 78].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-primary/80 transition-all hover:bg-primary" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
