import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { affiliateManager } from "@/services/affiliate/affiliate-manager";

// Register as affiliate
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Check if already affiliate in DB
    // TODO: Store affiliate record in DB

    const affiliate = affiliateManager.registerAffiliate(
      session.user.email,
      session.user.name || "User"
    );

    return NextResponse.json({
      success: true,
      message: "Registered as affiliate",
      affiliate,
    });
  } catch (error) {
    console.error("Affiliate registration error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Get affiliate info
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query affiliate from DB by email
    // For now, return empty
    return NextResponse.json({
      affiliate: null,
      message: "Not an affiliate yet. Call POST to register.",
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
