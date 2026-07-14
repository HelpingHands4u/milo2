import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "Create account — Student ChatBot AI" }] }),
});

const roles = [
  { id: "student", label: "Student", icon: BookOpen, desc: "Learn and ask" },
  { id: "lecturer", label: "Lecturer", icon: GraduationCap, desc: "Teach and post" },
  { id: "senior", label: "Senior Mentor", icon: Users, desc: "Guide juniors" },
] as const;

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("student");

  return (
    <AppShell hideFooter>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join the Student ChatBot AI community.</p>

            <div className="mt-6">
              <div className="text-sm font-medium">I am a…</div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-left transition ${
                      role === r.id
                        ? "border-primary bg-primary-soft"
                        : "border-border hover:border-foreground/20"
                    }`}
                  >
                    <r.icon className={`mt-0.5 h-5 w-5 shrink-0 ${role === r.id ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${role === r.id ? "text-primary" : ""}`}>{r.label}</div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/dashboard" });
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fname">First name</Label>
                  <Input id="fname" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lname">Last name</Label>
                  <Input id="lname" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">University email</Label>
                <Input id="email" type="email" placeholder="you@university.edu" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="At least 8 characters" required />
              </div>
              <Button type="submit" className="w-full">Create account</Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have one? <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
