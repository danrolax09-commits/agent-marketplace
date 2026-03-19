import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// V4: Subscription Management API
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query user's subscription from DB
    const subscription = {
      userId: session.user?.email || "unknown",
      tier: "free",
      features: {
        listAgents: 1,
        uploadAgents: false,
        analytics: false,
      },
      nextBillingDate: null,
      status: "active",
    };

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// V4: Upgrade subscription
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tier } = await req.json();
    
    // TODO: Create Stripe subscription in DB
    const subscription = {
      userId: session.user?.email || "unknown",
      tier,
      status: "pending_payment",
      stripeSubscriptionId: null,
    };

    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
