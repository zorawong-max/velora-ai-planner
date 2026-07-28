import Link from "next/link";
import { siteConfig } from "@/config/site";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Blueprint", href: "/blueprint" },
      { label: "Expert Review", href: "/rfq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

const CONTACT_EMAILS = [
  { label: "General", email: "hello@veloradns.com" },
  { label: "Sales", email: "sales@veloradns.com" },
  { label: "Support", email: "support@veloradns.com" },
] as const;

export function Footer() {
  const [product, company, legal] = FOOTER_COLUMNS;

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-4">
          <FooterColumn title={product.title}>
            {product.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title={company.title}>
            {company.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            {CONTACT_EMAILS.map((contact) => (
              <li key={contact.email}>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title={legal.title}>
            {legal.links.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG, no optimization needed */}
          <img src="/brand/logo-black.svg" alt="VELORA" className="h-6 w-auto" />
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {siteConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
