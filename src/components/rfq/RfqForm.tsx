"use client";

import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { usePlannerStore } from "@/store/planner-store";
import { submitRfq } from "@/actions/rfq";

interface RfqFormValues {
  companyName: string;
  contactEmail: string;
  notes: string;
  hpAddress: string;
}

const INITIAL_VALUES: RfqFormValues = {
  companyName: "",
  contactEmail: "",
  notes: "",
  hpAddress: "",
};

export function RfqForm() {
  const blueprint = usePlannerStore((state) => state.blueprint);
  const answers = usePlannerStore((state) => state.answers);

  const [values, setValues] = useState<RfqFormValues>(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const companyId = useId();
  const emailId = useId();
  const notesId = useId();
  const honeypotId = useId();

  function updateField<K extends keyof RfqFormValues>(field: K, value: RfqFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!blueprint) return;

    setError(null);
    startTransition(async () => {
      const result = await submitRfq({
        companyName: values.companyName,
        contactEmail: values.contactEmail,
        notes: values.notes,
        hpAddress: values.hpAddress,
        blueprint,
        answers,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSubmitted(true);
    });
  }

  if (!blueprint) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <h2 className="text-lg font-semibold">No blueprint yet</h2>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Complete the planning wizard to generate a blueprint before requesting expert review.
          </p>
          <Button
            render={<Link href="/blueprint" />}
            nativeButton={false}
            className="bg-brand text-brand-foreground hover:bg-brand/90 mt-6"
          >
            Start Planning
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center py-12 text-center">
          <div className="bg-brand/10 text-brand flex size-12 items-center justify-center rounded-full">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">Review requested</h2>
          <p className="text-muted-foreground mt-2 max-w-sm text-sm">
            Your blueprint has been sent to the VELORA team. An expert will follow up shortly to
            review your requirements.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div
            className="absolute top-auto left-[-9999px] h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor={honeypotId}>Leave this field blank</label>
            <input
              id={honeypotId}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.hpAddress}
              onChange={(event) => updateField("hpAddress", event.target.value)}
            />
          </div>

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

          {error && <p className="text-destructive text-xs">{error}</p>}

          <Button
            type="submit"
            disabled={isPending}
            className="bg-brand text-brand-foreground hover:bg-brand/90 w-full sm:w-auto"
          >
            {isPending ? "Sending…" : "Request Expert Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
