import { NextResponse } from "next/server";
import { platformSnapshot } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() { return NextResponse.json(platformSnapshot()); }
