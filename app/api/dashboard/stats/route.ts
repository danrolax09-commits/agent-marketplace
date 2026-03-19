import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    users: 1250, revenue: 4500, conversion: 3.2, growth: 12.5
  });
}
