import Link from "next/link";
import { MessageSquare, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STEPS = [
  {
    icon: MessageSquare,
    title: "Describe your needs",
    description:
      "Tell the AI Planner what you're building — workload type, scale, timeline, and budget.",
  },
  {
    icon: FileText,
    title: "Review your blueprint",
    description:
      "Get a structured infrastructure blueprint: recommended configuration, timeline, and cost range.",
  },
  {
    icon: Send,
    title: "Request a quote",
    description: "Turn your blueprint into an RFQ and send it to the VELORA supplier network.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="max-w-2xl">
        <p className="text-brand text-xs font-semibold tracking-widest uppercase">
          VELORA AI Planner
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Plan your AI infrastructure in minutes, not weeks.
        </h1>
        <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
          Describe what you need in plain language. The AI Planner turns the conversation into a
          structured blueprint and a ready-to-send RFQ for the VELORA supplier network.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            render={<Link href="/conversation" />}
            nativeButton={false}
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            Start Planning
          </Button>
          <Button
            render={<Link href="/blueprint" />}
            nativeButton={false}
            variant="outline"
            size="lg"
          >
            See a sample blueprint
          </Button>
        </div>
      </div>

      <div className="mt-20 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <Card key={step.title}>
            <CardContent className="pt-2">
              <div className="bg-brand/10 text-brand flex size-9 items-center justify-center rounded-lg">
                <step.icon className="size-4.5" aria-hidden="true" />
              </div>
              <p className="text-muted-foreground mt-4 text-xs font-medium">Step {index + 1}</p>
              <h2 className="mt-1 text-base font-semibold">{step.title}</h2>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
