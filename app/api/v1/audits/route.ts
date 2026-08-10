import { NextResponse } from "next/server";
import { demoAudit, demoEvidence } from "@/lib/demo-data";

export async function POST() {
  return NextResponse.json({ auditId: "audit_demo_2408", status: "completed", scope: "seeded vendor-risk fleet", ...demoAudit, evidence: demoEvidence, provenance: "SEEDED_DEMO_DATA" }, { status: 201 });
}
