import { z } from "zod";

export const DiagnosticLeadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(160),
  stack: z.string().trim().min(2).max(160),
  engagement: z.enum(["Fleet Diagnostic", "Stabilization Sprint", "Managed Governance"]),
  issue: z.string().trim().min(20).max(4000),
  context: z.string().trim().max(4000).optional().default(""),
});

export type DiagnosticLead = z.infer<typeof DiagnosticLeadSchema>;
