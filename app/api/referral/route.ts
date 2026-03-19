// V3 Feature: Referral System API
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { referrerCode, refereeEmail } = await request.json();

  // Mock referral processing
  const referralBonus = 0.15; // 15% commission for referrer
  const refereeDiscount = 0.10; // 10% discount for referee

  if (!referrerCode || !refereeEmail) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Simulate referral registration
  const referral = {
    id: `ref_${Date.now()}`,
    referrerCode,
    refereeEmail,
    discount: refereeDiscount,
    bonus: referralBonus,
    status: 'pending',
    createdAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    referral,
    message: `Referral created. ${refereeEmail} will receive ${(refereeDiscount * 100).toFixed(0)}% discount.`,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const referrerCode = searchParams.get('code');

  if (!referrerCode) {
    return NextResponse.json(
      { error: 'Referrer code required' },
      { status: 400 }
    );
  }

  // Mock referral stats
  const stats = {
    referrerCode,
    totalReferrals: 47,
    activeReferrals: 32,
    totalCommission: 1250.45,
    pendingCommission: 342.80,
    conversionRate: 0.68,
  };

  return NextResponse.json(stats);
}
