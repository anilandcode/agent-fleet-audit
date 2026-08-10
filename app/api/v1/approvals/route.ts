import { NextResponse } from "next/server";
import { z } from "zod";

const ApprovalSchema = z.object({ authorizationId: z.string().min(1), actionDigest: z.string().min(8), approvedBy: z.string().min(1), expiresAt: z.string().datetime() });

export async function POST(request: Request) {
  try {
    const approval = ApprovalSchema.parse(await request.json());
    return NextResponse.json({ approvalId: `apr_${approval.authorizationId}`, status: "approved", binding: { authorizationId: approval.authorizationId, actionDigest: approval.actionDigest, expiresAt: approval.expiresAt }, approvedBy: approval.approvedBy }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid approval" }, { status: 400 }); }
}
