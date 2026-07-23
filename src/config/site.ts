export const siteConfig = {
  name: "VELORA AI Planner",
  description: "AI-assisted planning workspace for VELORA infrastructure procurement.",
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Conversation", href: "/conversation" },
  { label: "Blueprint", href: "/blueprint" },
  { label: "RFQ", href: "/rfq" },
];
