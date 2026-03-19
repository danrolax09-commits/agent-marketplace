import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mailer } from "@/services/email/mailer";

// Send notification to user
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await req.json();

    // Route to appropriate email template
    let result;
    switch (type) {
      case "welcome":
        result = await mailer.sendWelcomeEmail(
          session.user.email,
          session.user.name || "User"
        );
        break;

      case "new_agent":
        result = await mailer.sendSellerAlert(session.user.email, data);
        break;

      case "new_job":
        result = await mailer.sendBuyerAlert(session.user.email, data);
        break;

      case "payment_confirmation":
        result = await mailer.sendPaymentConfirmation(
          session.user.email,
          data.amount,
          data.product
        );
        break;

      default:
        return NextResponse.json({ error: "Unknown notification type" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Notification send error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

// Get notification status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: Query notification history from DB
    const notifications = [
      {
        id: "1",
        type: "welcome",
        status: "delivered",
        sentAt: new Date(),
      },
    ];

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
