import type { Metadata } from "next";
import { BlueprintView } from "@/components/blueprint/BlueprintView";

export const metadata: Metadata = {
  title: "Blueprint",
};

export default function BlueprintPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Your Infrastructure Blueprint</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        A structured summary generated from your conversation.
      </p>

      <div className="mt-8">
        <BlueprintView />
      </div>
    </div>
  );
}
