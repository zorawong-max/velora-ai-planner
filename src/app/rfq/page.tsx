import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

export const metadata: Metadata = {
  title: "RFQ",
};

export default function RfqPage() {
  return (
    <PagePlaceholder
      title="RFQ"
      description="Placeholder page. Business logic and UI not yet implemented."
    />
  );
}
