import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Request payout
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, method } = await req.json(); // stripe, bank_transfer, paypal

    // TODO: Validate amount >= $50 minimum
    // TODO: Validate payment method
    // TODO: Create payout record in DB
    // TODO: Process payment (via Stripe Connect, ACH, PayPal API)

    return NextResponse.json({
      success: true,
      message: "Payout requested",
      payout: {
        id: `payout_${Date.now()}`,
        amount,
        method,
        status: "pending",
        createdAt: new Date(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Get payout history
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query payout history from DB
    const payouts: any[] = [
      // { id, amount, method, status, date }
    ];

    return NextResponse.json({
      payouts,
      totalPaid: 0,
      pendingAmount: 0,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
