import { NextResponse } from "next/server";
import { AuthorizeRequestSchema } from "@/lib/contracts";
import { authorize } from "@/lib/store";

export async function POST(request: Request) {
  try { return NextResponse.json(authorize(AuthorizeRequestSchema.parse(await request.json()))); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid authorization request" }, { status: 400 }); }
}
