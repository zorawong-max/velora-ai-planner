import Link from "next/link";
import { navItems, siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label={siteConfig.name}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG, no optimization needed */}
          <img src="/brand/logo-black.svg" alt="VELORA" className="h-9 w-auto" />
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
