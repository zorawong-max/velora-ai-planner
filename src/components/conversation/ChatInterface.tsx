"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePlannerStore } from "@/store/planner-store";
import { continueConversation } from "@/actions/conversation";
import { generateBlueprint } from "@/actions/blueprint";
import type { ChatMessage } from "@/lib/ai/types";

export function ChatInterface() {
  const messages = usePlannerStore((state) => state.messages);
  const readyForBlueprint = usePlannerStore((state) => state.readyForBlueprint);
  const addMessages = usePlannerStore((state) => state.addMessages);
  const setReadyForBlueprint = usePlannerStore((state) => state.setReadyForBlueprint);
  const setBlueprint = usePlannerStore((state) => state.setBlueprint);

  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed || isPending) return;

    setError(null);
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const history = [...messages, userMessage];
    addMessages([userMessage]);
    setDraft("");

    startTransition(async () => {
      const result = await continueConversation(history);

      if (!result.success) {
        setError(result.error);
        return;
      }

      addMessages([{ role: "assistant", content: result.data.reply }]);

      if (result.data.readyForBlueprint) {
        setReadyForBlueprint(true);
        const blueprintResult = await generateBlueprint([
          ...history,
          { role: "assistant", content: result.data.reply },
        ]);
        if (blueprintResult.success) {
          setBlueprint(blueprintResult.data);
        } else {
          setError(blueprintResult.error);
        }
      }
    });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex h-[32rem] flex-col overflow-hidden rounded-xl border">
      <ScrollArea className="min-h-0 flex-1 px-4 py-5">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
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
          {isPending && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm">
                …
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        {error && <p className="text-destructive mb-2 px-1 text-xs">{error}</p>}

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
              disabled={isPending}
              className="max-h-32 min-h-10 resize-none"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!draft.trim() || isPending}
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
