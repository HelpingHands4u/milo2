import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "AI Chat — Student ChatBot AI" }] }),
});

type Msg = { role: "user" | "ai"; text: string };

const starters = [
  "Explain recursion like I'm 12",
  "Summarize the French Revolution in 5 bullets",
  "Debug: why is my for loop off by one?",
  "Give me 3 practice questions on limits",
];

const subjects = ["General", "Mathematics", "Physics", "Computer Science", "Economics", "Biology"];

function ChatPage() {
  const [subject, setSubject] = useState("General");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! I'm your AI study assistant. Ask me anything — from concept explanations to code help." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Here's a clear take on "${trimmed}" (subject: ${subject}). Once Gemini API is connected, I'll return live answers with examples, sources, and follow-up questions.`,
        },
      ]);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }, 400);
  };

  return (
    <AppShell hideFooter>
      <div className="mx-auto grid h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-border bg-card p-4 md:block">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Subjects</div>
          <div className="mt-3 space-y-1">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSubject(s)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                  subject === s ? "bg-primary-soft font-medium text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-border bg-primary-soft/50 p-3 text-xs text-muted-foreground">
            <div className="font-medium text-primary">Tip</div>
            Ask follow-ups to go deeper — the AI keeps context within your chat.
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-accent">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI Assistant</div>
                <div className="text-xs text-muted-foreground">Subject: {subject}</div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((m, i) => (
                <MessageBubble key={i} m={m} />
              ))}

              {messages.length <= 1 && (
                <div className="pt-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-accent" /> Try a starter
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {starters.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-lg border border-border bg-card p-3 text-left text-sm hover:border-primary/40 hover:bg-primary-soft"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-border bg-card px-4 py-3 sm:px-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="mx-auto flex max-w-3xl items-end gap-2"
            >
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask anything — concepts, code, summaries…"
                className="min-h-[52px] flex-1 resize-none"
                rows={1}
              />
              <Button type="submit" size="icon" className="h-[52px] w-[52px] shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
              AI can make mistakes — verify important information.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function MessageBubble({ m }: { m: Msg }) {
  if (m.role === "user") {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {m.text}
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <Bot className="h-4 w-4" />
      </div>
      <Card className="max-w-[85%] border-border">
        <CardContent className="px-4 py-3 text-sm">{m.text}</CardContent>
      </Card>
    </div>
  );
}
