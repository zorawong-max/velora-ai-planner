"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "assistant-0",
  role: "assistant",
  content:
    "Hi — tell me about the AI infrastructure you're looking to plan. Include the workload type, scale, target timeline, and budget if you know them.",
};

// Scripted follow-ups standing in for the real AI backend — replace this
// with an actual model call when the conversation service is wired up.
const SCRIPTED_REPLIES = [
  "Got it. What scale are you thinking — a single server, a rack, or a full cluster?",
  "Thanks — that helps. Do you have a target deployment timeline or budget range in mind?",
  "That's enough for a first draft. I've put together a blueprint based on what you've shared.",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [exchangeCount, setExchangeCount] = useState(0);
  const inputId = useId();

  const readyForBlueprint = exchangeCount >= SCRIPTED_REPLIES.length;

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${messages.length}`,
      role: "user",
      content: trimmed,
    };

    const replyIndex = Math.min(exchangeCount, SCRIPTED_REPLIES.length - 1);
    const assistantMessage: ChatMessage = {
      id: `assistant-${messages.length + 1}`,
      role: "assistant",
      content: SCRIPTED_REPLIES[replyIndex],
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setExchangeCount((count) => count + 1);
    setDraft("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-xl border">
      <ScrollArea className="flex-1 px-4 py-5">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-brand text-brand-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        {readyForBlueprint ? (
          <div className="flex items-center justify-between gap-3 px-1 py-1">
            <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
              <Sparkles className="text-brand size-4" aria-hidden="true" />
              Your blueprint is ready.
            </p>
            <Button
              render={<Link href="/blueprint" />}
              nativeButton={false}
              className="bg-brand text-brand-foreground hover:bg-brand/90"
            >
              View Blueprint
            </Button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <label htmlFor={inputId} className="sr-only">
              Message
            </label>
            <Textarea
              id={inputId}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your infrastructure needs…"
              rows={1}
              className="max-h-32 min-h-10 resize-none"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!draft.trim()}
              aria-label="Send message"
              className="bg-brand text-brand-foreground hover:bg-brand/90 shrink-0"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
