import { z } from "zod";

export const rfqSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(200),
  contactEmail: z.email("Enter a valid email"),
  notes: z.string().max(4000).optional().or(z.literal("")),

  // Anti-spam honeypot — must stay empty. Hidden from real users via CSS.
  hpAddress: z.string().max(0).optional().or(z.literal("")),
});

export type RfqInput = z.infer<typeof rfqSchema>;
