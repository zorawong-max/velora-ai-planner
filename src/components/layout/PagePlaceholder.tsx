interface PagePlaceholderProps {
  title: string;
  description: string;
}

/**
 * Minimal placeholder used by every route until real UI/business logic
 * for that page is implemented.
 */
export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
}
