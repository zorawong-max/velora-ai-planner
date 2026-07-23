import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- static brand SVG, no optimization needed */}
        <img src="/brand/logo-black.svg" alt="VELORA" className="h-6 w-auto" />
        <p className="text-muted-foreground mt-2 text-xs">
          © {new Date().getFullYear()} {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
