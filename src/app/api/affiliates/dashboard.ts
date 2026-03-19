import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Get affiliate dashboard data
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query affiliate stats from DB
    const dashboard = {
      totalEarnings: 0,
      pendingEarnings: 0,
      paidEarnings: 0,
      totalReferrals: 0,
      conversionRate: 0,
      topProducts: [
        { product: "agent", referrals: 0, earnings: 0 },
        { product: "cryptotracker", referrals: 0, earnings: 0 },
        { product: "aijobs", referrals: 0, earnings: 0 },
      ],
      recentReferrals: [
        // { email, product, amount, commission, date }
      ],
      payoutHistory: [
        // { amount, date, status }
      ],
      referralLink: "",
      shareText: "Check out this amazing AI marketplace!",
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
