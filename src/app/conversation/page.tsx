import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Conversation",
};

export default function ConversationPage() {
  return (
    <PagePlaceholder
      title="Conversation"
      description="Placeholder page. Business logic and UI not yet implemented."
    />
  );
}
