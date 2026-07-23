import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "Blueprint",
};

export default function BlueprintPage() {
  return (
    <PagePlaceholder
      title="Blueprint"
      description="Placeholder page. Business logic and UI not yet implemented."
    />
  );
}
