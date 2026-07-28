import type { Metadata } from "next";
import { BlueprintFlow } from "@/components/blueprint/BlueprintFlow";

export const metadata: Metadata = {
  title: "Blueprint",
};

export default function BlueprintPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Your Infrastructure Blueprint</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Complete the planning wizard to generate a structured infrastructure blueprint.
      </p>

      <div className="mt-8">
        <BlueprintFlow />
      </div>
    </div>
  );
}
