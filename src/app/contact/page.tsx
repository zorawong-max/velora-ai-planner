import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
};

const CONTACTS = [
  { label: "General", email: "hello@veloradns.com" },
  { label: "Sales", email: "sales@veloradns.com" },
  { label: "Support", email: "support@veloradns.com" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Contact VELORA</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        Reach the right team directly using the email addresses below.
      </p>

      <div className="mt-8">
        <Card>
          <CardContent className="grid gap-6 sm:grid-cols-3">
            {CONTACTS.map((contact) => (
              <div key={contact.label}>
                <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                  {contact.label}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 block text-base font-semibold hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
