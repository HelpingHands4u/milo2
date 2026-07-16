import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Log in — Student ChatBot AI" }] }),
});

const roles = [
  { id: "student", label: "Student", icon: BookOpen },
  { id: "lecturer", label: "Lecturer", icon: GraduationCap },
  { id: "senior", label: "Senior Mentor", icon: Users },
] as const;

function LoginPage() {
  // const navigate = useNavigate();
  // const [role, setRole] = useState<(typeof roles)[number]["id"]>("student");
     const navigate = useNavigate();

const [role, setRole] = useState<(typeof roles)[number]["id"]>("student");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // navigate({ to: "/dashboard" });
      alert("Login successful!");
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

            {/* <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/dashboard" });
              }}
            > */}
            <form
              className="mt-6 space-y-4"
              onSubmit={handleLogin}
              >
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                {/* <Input id="email" type="email" placeholder="you@university.edu" required /> */}
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
                </div>
                {/* <Input id="password" type="password" placeholder="••••••••" required /> */}
                <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
              </div>
              <Button type="submit" className="w-full">Log in as {roles.find((r) => r.id === role)?.label}</Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
