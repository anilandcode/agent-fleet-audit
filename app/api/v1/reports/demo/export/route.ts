import { NextResponse } from "next/server";
import { demoAudit, demoEvidence, demoTenant } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({ reportVersion: "agent-fleet-report.v1", generatedAt: new Date().toISOString(), scope: demoTenant, provenance: "SEEDED_DEMO_DATA", ...demoAudit, evidence: demoEvidence }, { headers: { "content-disposition": "attachment; filename=agent-fleet-diagnostic-demo.json" } });
}
