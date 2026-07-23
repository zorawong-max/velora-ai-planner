"use client";

import { useId, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface RfqFormValues {
  companyName: string;
  contactEmail: string;
  notes: string;
}

const INITIAL_VALUES: RfqFormValues = {
  companyName: "",
  contactEmail: "",
  notes: "",
};

export function RfqForm() {
  const [values, setValues] = useState<RfqFormValues>(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const companyId = useId();
  const emailId = useId();
  const notesId = useId();

  function updateField<K extends keyof RfqFormValues>(field: K, value: RfqFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // No backend wired up yet — this simulates a submission so the flow can
    // be reviewed end-to-end. Replace with a real request when the RFQ
    // service exists.
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-full">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">RFQ sent</h2>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Your request has been sent to the VELORA supplier network. The team will follow up with
            matched suppliers shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor={companyId}>Company Name</Label>
            <Input
              id={companyId}
              required
              value={values.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              placeholder="Acme AI Labs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={emailId}>Contact Email</Label>
            <Input
              id={emailId}
              type="email"
              required
              value={values.contactEmail}
              onChange={(event) => updateField("contactEmail", event.target.value)}
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={notesId}>Additional Notes</Label>
            <Textarea
              id={notesId}
              value={values.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              placeholder="Anything else the supplier network should know?"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="bg-brand text-brand-foreground hover:bg-brand/90 w-full sm:w-auto"
          >
            {submitting ? "Sending…" : "Send RFQ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
