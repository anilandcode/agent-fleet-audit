import { NextResponse } from "next/server";
import { z } from "zod";

const ReconcileSchema = z.object({ reservationId: z.string().min(1), actualCostUsd: z.number().nonnegative(), actualTokens: z.number().int().nonnegative() });

export async function POST(request: Request) {
  try {
    const input = ReconcileSchema.parse(await request.json());
    return NextResponse.json({ ...input, status: "reconciled", note: "Demo mode verifies the accounting contract; persistent ledgers require Supabase configuration." });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid reconciliation" }, { status: 400 }); }
}
