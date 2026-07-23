import Link from "next/link";
import { Cpu, CalendarClock, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Illustrative sample data. In the real product this is generated from the
// conversation instead of hard-coded here.
const SECTIONS = [
  {
    icon: Cpu,
    title: "Compute Requirements",
    description: "Recommended configuration based on your conversation",
    items: [
      { label: "Workload type", value: "Model training" },
      { label: "GPU configuration", value: "8× H100, rack-scale" },
      { label: "Hardware condition", value: "New" },
    ],
  },
  {
    icon: CalendarClock,
    title: "Deployment Plan",
    description: "Timeline and location considerations",
    items: [
      { label: "Target timeline", value: "8–12 weeks" },
      { label: "Location preference", value: "North America" },
      { label: "Deployment support", value: "Rack integration + power-up" },
    ],
  },
  {
    icon: Wallet,
    title: "Estimated Investment",
    description: "Commercial parameters for supplier matching",
    items: [
      { label: "Estimated budget", value: "$450K–$650K" },
      { label: "Commercial model", value: "Purchase or lease" },
      { label: "Currency", value: "USD" },
    ],
  },
];

export function BlueprintView() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-3">
        {SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="bg-brand/10 text-brand mb-2 flex size-9 items-center justify-center rounded-lg">
                <section.icon className="size-4.5" aria-hidden="true" />
              </div>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2.5">
                {section.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{item.label}</dt>
                    <dd className="text-right font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-brand/10 text-brand">Ready</Badge>
              <p className="text-sm font-medium">Blueprint ready for supplier matching</p>
            </div>
            <p className="text-muted-foreground mt-1.5 text-sm">
              Turn this blueprint into an RFQ to reach the VELORA supplier network.
            </p>
          </div>
          <Button
            render={<Link href="/rfq" />}
            nativeButton={false}
            className="bg-brand text-brand-foreground hover:bg-brand/90 shrink-0"
          >
            Request Quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>

      <Separator />
      <p className="text-muted-foreground text-xs">
        This is a sample blueprint layout. Once the conversation service is connected, this page
        will reflect the actual requirements you described.
      </p>
    </div>
  );
}
