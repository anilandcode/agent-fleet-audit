import { NextResponse } from "next/server";
import { DiagnosticLeadSchema, type DiagnosticLead } from "@/lib/lead-schema";

const leads: Array<DiagnosticLead & { receivedAt: string }> = [];

export async function POST(request: Request) {
  const parsed = DiagnosticLeadSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete the required diagnostic details.", issues: parsed.error.flatten() }, { status: 400 });
  const lead = { ...parsed.data, receivedAt: new Date().toISOString() };
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    const response = await fetch(webhookUrl, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
    if (!response.ok) return NextResponse.json({ error: "The intake destination did not accept the request." }, { status: 502 });
    return NextResponse.json({ accepted: true, delivered: true, receivedAt: lead.receivedAt }, { status: 201 });
  }
  leads.push(lead);
  return NextResponse.json({ accepted: true, delivered: false, receivedAt: lead.receivedAt }, { status: 201 });
}
