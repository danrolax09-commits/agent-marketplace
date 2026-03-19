import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Get user's notification preferences
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query notification preferences from DB
    const preferences = {
      userId: session.user.email,
      email: {
        newAgents: true,
        newJobs: false,
        promotions: true,
        weeklyDigest: true,
      },
      push: {
        priceAlerts: true,
        messages: true,
      },
    };

    return NextResponse.json(preferences);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Update notification preferences
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const preferences = await req.json();

    // TODO: Save preferences to DB
    return NextResponse.json({
      success: true,
      message: "Notification preferences updated",
      preferences,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Unsubscribe from all notifications
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Unsubscribe user from all notifications in DB
    return NextResponse.json({
      success: true,
      message: "Unsubscribed from all notifications",
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
