import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, BookOpen, Users, AlertCircle, Loader2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Log in — Student ChatBot AI" }] }),
});

const roles = [
  { id: "student", label: "Student", icon: BookOpen },
  { id: "lecturer", label: "Lecturer", icon: GraduationCap },
  { id: "senior", label: "Senior Mentor", icon: Users },
] as const;

// Simple in-memory demo accounts (no backend required)
const DEMO_ACCOUNTS: Record<string, { password: string; role: string }> = {
  "student@demo.com": { password: "student123", role: "student" },
  "lecturer@demo.com": { password: "lecturer123", role: "lecturer" },
  "mentor@demo.com": { password: "mentor123", role: "senior" },
};

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate({ to: "/dashboard" });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <AppShell hideFooter>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div className="hidden md:block">
          <h1 className="text-4xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-3 text-muted-foreground">
            Continue learning, mentoring or teaching. Your workspace is ready.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>• Ask AI anything, get instant answers</li>
            <li>• Connect with senior mentors</li>
            <li>• Stay on top of lecturer announcements</li>
          </ul>
          <div className="mt-8 rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground mb-2">Demo accounts</div>
            <div className="space-y-1">
              <div><span className="font-medium text-foreground">student@demo.com</span> / student123</div>
              <div><span className="font-medium text-foreground">lecturer@demo.com</span> / lecturer123</div>
              <div><span className="font-medium text-foreground">mentor@demo.com</span> / mentor123</div>
            </div>
          </div>
        </div>

        <Card className="border-border shadow-(--shadow-card)">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold">Log in to your account</h2>
            <p className="mt-1 text-sm text-muted-foreground">Choose your role and sign in.</p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition ${
                    role === r.id
                      ? "border-primary bg-primary-soft text-primary"
                      : "border-border text-muted-foreground hover:border-foreground/20"
                  }`}
                >
                  <r.icon className="h-5 w-5" />
                  {r.label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="mt-5 space-y-4" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>Log in as {roles.find((r) => r.id === role)?.label}</>
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
