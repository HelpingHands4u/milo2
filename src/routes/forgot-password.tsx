import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({ meta: [{ title: "Forgot password — Student ChatBot AI" }] }),
});

function ForgotPage() {
  const [sent, setSent] = useState(false);

  return (
    <AppShell hideFooter>
      <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <Card className="border-border shadow-(--shadow-card)">
          <CardContent className="p-6 sm:p-8">
            <h1 className="text-xl font-semibold">Reset your password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and we'll send you a reset link.
            </p>

            {sent ? (
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-accent-soft p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <div className="font-medium text-foreground">Check your inbox</div>
                  <div className="text-muted-foreground">If an account exists, a reset link is on its way.</div>
                </div>
              </div>
            ) : (
              <form
                className="mt-5 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@university.edu" required />
                </div>
                <Button type="submit" className="w-full">Send reset link</Button>
              </form>
            )}

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Remembered it? <Link to="/login" className="text-primary hover:underline">Back to log in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
