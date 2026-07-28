export const siteConfig = {
  name: "VELORA Blueprint",
  description: "Enterprise AI Infrastructure Blueprint workflow — plan, generate, and request expert review.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Blueprint", href: "/blueprint" },
  { label: "Expert Review", href: "/rfq" },
  { label: "Contact", href: "/contact" },
];
