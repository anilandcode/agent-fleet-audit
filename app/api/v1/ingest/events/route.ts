import { NextResponse } from "next/server";
import { IngestBatchSchema } from "@/lib/contracts";
import { appendEvents } from "@/lib/store";

export async function POST(request: Request) {
  try { return NextResponse.json(appendEvents(IngestBatchSchema.parse(await request.json()).events), { status: 202 }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid event batch" }, { status: 400 }); }
}
