import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/chat/$mentorId")({
  component: MentorChat,
});

function MentorChat() {
  const { mentorId } = Route.useParams();

  return (
    <AppShell>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Chat with Mentor</h1>
        <p className="mt-3">Mentor ID: {mentorId}</p>
      </div>
    </AppShell>
  );
}