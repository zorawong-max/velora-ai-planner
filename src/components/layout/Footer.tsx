import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto max-w-5xl px-4 py-6 text-xs">
        © {new Date().getFullYear()} {siteConfig.name}.
      </div>
    </footer>
  );
}
