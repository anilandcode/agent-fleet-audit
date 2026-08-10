import { NextResponse } from "next/server";
import { AuthorizeRequestSchema } from "@/lib/contracts";
import { authorize } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const authorization = authorize(AuthorizeRequestSchema.parse(await request.json()));
    return NextResponse.json({ reservationId: `res_${authorization.authorizationId}`, status: authorization.decision === "allow" ? "reserved" : authorization.decision, authorization });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid budget reservation" }, { status: 400 }); }
}
