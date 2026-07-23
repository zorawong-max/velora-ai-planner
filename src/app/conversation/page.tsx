import type { Metadata } from "next";
import { ChatInterface } from "@/components/conversation/ChatInterface";

export const metadata: Metadata = {
  title: "Conversation",
};

export default function ConversationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">AI Conversation</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Describe your infrastructure needs. Once I have enough detail, I&rsquo;ll put together a
        blueprint.
      </p>

      <div className="mt-8">
        <ChatInterface />
      </div>
    </div>
  );
}
