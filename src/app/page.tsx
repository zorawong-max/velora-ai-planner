import Link from "next/link";
import { ClipboardList, Cpu, Lock, LifeBuoy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: ClipboardList,
    title: "AI Infrastructure Planning",
    description: "Turn business requirements into deployable AI infrastructure plans.",
  },
  {
    icon: Cpu,
    title: "GPU & Compute Sourcing",
    description: "Source enterprise GPUs and compute from trusted providers.",
  },
  {
    icon: Lock,
    title: "Private AI Deployment",
    description: "Deploy enterprise AI securely on-premises or in the cloud.",
  },
  {
    icon: LifeBuoy,
    title: "Enterprise Support",
    description: "Expert guidance from planning through production.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Enterprise AI Infrastructure, Simplified.
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-balance">
          Plan, source, deploy, and manage enterprise AI infrastructure from a single platform.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<Link href="/blueprint" />}
            nativeButton={false}
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            Start Planning
          </Button>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            variant="outline"
            size="lg"
          >
            Talk to an Expert
          </Button>
        </div>
      </div>

      <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Card key={feature.title}>
            <CardContent className="pt-2">
              <div className="bg-brand/10 text-brand flex size-9 items-center justify-center rounded-lg">
                <feature.icon className="size-4.5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-base font-semibold">{feature.title}</h2>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
