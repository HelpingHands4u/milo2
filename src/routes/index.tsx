import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, GraduationCap, MessageSquare, Sparkles, Users, BookOpen, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: Bot, title: "Instant AI Answers", desc: "Ask academic questions and get clear, well-structured explanations 24/7." },
  { icon: BookOpen, title: "Summarize Notes", desc: "Turn long lecture notes into concise, exam-ready summaries." },
  { icon: MessageSquare, title: "Coding Help", desc: "Debug code, understand errors and learn best practices step by step." },
  { icon: Users, title: "Connect with Seniors", desc: "Get mentorship from experienced students who've been in your shoes." },
  { icon: GraduationCap, title: "Learn from Lecturers", desc: "Access announcements, notes and assignments in one organized place." },
  { icon: ShieldCheck, title: "Safe & Private", desc: "A secure academic space designed for focused learning and collaboration." },
];

const stats = [
  { value: "25k+", label: "Active students" },
  { value: "1.2M", label: "Questions answered" },
  { value: "800+", label: "Verified mentors" },
  { value: "120+", label: "Partner departments" },
];

const testimonials = [
  { name: "Ananya S.", role: "CS Undergraduate", quote: "It's like having a patient tutor available any time I hit a wall on a problem set." },
  { name: "Dr. Rahul M.", role: "Lecturer, Physics", quote: "Announcements and student queries all in one clean workspace. My inbox thanks me." },
  { name: "Priya K.", role: "Senior Mentor", quote: "I love that juniors can reach out easily. The mentor profiles feel personal, not corporate." },
];

function Landing() {
  return (
    <AppShell>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--primary-soft),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI-powered academic assistant
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              Student ChatBot <span className="text-primary">AI</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Learn, Connect and Grow Together.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              A friendly workspace where students, seniors and lecturers collaborate — with an AI tutor always by your side.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/register">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/chat"><MessageSquare className="mr-1 h-4 w-4" /> Chat with AI</Link>
              </Button>
            </div>
          </div>

          {/* Preview card */}
          <div className="mx-auto mt-14 max-w-4xl">
            <Card className="overflow-hidden border-border shadow-[var(--shadow-elevated)]">
              <CardContent className="p-0">
                <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                  <div className="hidden flex-col gap-2 border-r border-border bg-muted/40 p-4 md:flex">
                    {["General", "Physics 101", "Data Structures", "Economics"].map((c, i) => (
                      <div key={c} className={`rounded-md px-3 py-2 text-sm ${i === 1 ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground"}`}>
                        {c}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2 text-sm text-primary-foreground">
                        Can you explain Newton's second law with an example?
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm">
                        Newton's second law states that <b>F = m·a</b>. Push a 2 kg book with 10 N and it accelerates at 5 m/s². Want a worked example with friction next?
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to learn better</h2>
          <p className="mt-3 text-muted-foreground">A focused toolkit for students, seniors and lecturers.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border transition-shadow hover:shadow-[var(--shadow-card)]">
              <CardContent className="p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved across campuses</h2>
          <p className="mt-3 text-muted-foreground">Real feedback from students, mentors and lecturers.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border">
              <CardContent className="p-6">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-foreground">"{t.quote}"</p>
                <div className="mt-4 text-sm">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Card className="overflow-hidden border-none bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
          <CardContent className="grid gap-6 p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">Ready to study smarter?</h3>
              <p className="mt-2 text-primary-foreground/85">
                Join thousands of learners already using Student ChatBot AI to unlock their potential.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <Link to="/chat">Chat with AI</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}
