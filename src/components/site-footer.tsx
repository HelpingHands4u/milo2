import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </span>
              Student ChatBot AI
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Learn, connect and grow together with AI-powered academic support.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/chat" className="hover:text-foreground">AI Chat</Link></li>
              <li><Link to="/mentors" className="hover:text-foreground">Mentors</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">For Educators</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/lecturer" className="hover:text-foreground">Lecturer tools</Link></li>
              <li><Link to="/register" className="hover:text-foreground">Join as lecturer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Account</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground">Log in</Link></li>
              <li><Link to="/register" className="hover:text-foreground">Create account</Link></li>
              <li><Link to="/forgot-password" className="hover:text-foreground">Forgot password</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Student ChatBot AI. Built for learners, mentors and lecturers.
        </div>
      </div>
    </footer>
  );
}
