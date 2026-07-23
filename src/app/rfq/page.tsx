import type { Metadata } from "next";
import { RfqForm } from "@/components/rfq/RfqForm";

export const metadata: Metadata = {
  title: "RFQ",
};

export default function RfqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Request for Quote</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Confirm your details to send this blueprint to the VELORA supplier network.
      </p>

      <div className="mt-8">
        <RfqForm />
      </div>
    </div>
  );
}
