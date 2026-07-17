import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, BookOpen, Users, Loader2, AlertCircle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, increment, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
           await setDoc(
  doc(db, "analytics", "visitors"),
  {
    totalUsers: increment(1),
  },
  { merge: true }
);

      const user = userCredential.user;
 
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email: user.email,
        role,
        createdAt: serverTimestamp(),
      });

      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err?.message ?? "Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell hideFooter>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Card className="border-border shadow-(--shadow-card)">
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
                    <r.icon
                      className={`mt-0.5 h-5 w-5 shrink-0 ${role === r.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="min-w-0">
                      <div className={`text-sm font-medium ${role === r.id ? "text-primary" : ""}`}>
                        {r.label}
                      </div>
                      <div className="text-xs text-muted-foreground">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                {error}
              </div>
            )}

            <form className="mt-6 space-y-4" onSubmit={handleRegister}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fname">First name</Label>
                  <Input
                    id="fname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lname">Last name</Label>
                  <Input
                    id="lname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">University email</Label>
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account…
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have one?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
