// Affiliate program management
// 15% commission on agent sales
// 20% on CryptoTracker subscriptions
// 25% on AI Jobs listings

export interface AffiliateUser {
  id: string;
  email: string;
  referralCode: string;
  referralLink: string;
  totalCommission: number;
  pendingCommission: number;
  paidCommission: number;
  referralCount: number;
  conversionRate: number;
  status: "active" | "suspended" | "inactive";
  joinedAt: Date;
}

export interface AffiliateReferral {
  id: string;
  affiliateId: string;
  referredUserEmail: string;
  product: "agent" | "cryptotracker" | "aijobs";
  amount: number;
  commission: number;
  status: "pending" | "completed" | "refunded";
  createdAt: Date;
  completedAt?: Date;
}

export interface CommissionPayout {
  id: string;
  affiliateId: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  method: "stripe" | "bank_transfer" | "paypal";
  createdAt: Date;
  completedAt?: Date;
}

class AffiliateManager {
  // Commission rates
  private readonly COMMISSION_RATES = {
    agent: 0.15, // 15%
    cryptotracker: 0.20, // 20%
    aijobs: 0.25, // 25%
  };

  // Generate unique referral code
  generateReferralCode(email: string): string {
    const timestamp = Date.now().toString(36);
    const hash = email.split("").reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    return `ref_${timestamp}_${Math.abs(hash).toString(36)}`.substring(0, 20);
  }

  // Register user as affiliate
  registerAffiliate(email: string, userName: string): AffiliateUser {
    const referralCode = this.generateReferralCode(email);
    const referralLink = `${process.env.NEXTAUTH_URL}?ref=${referralCode}`;

    return {
      id: `aff_${Date.now()}`,
      email,
      referralCode,
      referralLink,
      totalCommission: 0,
      pendingCommission: 0,
      paidCommission: 0,
      referralCount: 0,
      conversionRate: 0,
      status: "active",
      joinedAt: new Date(),
    };
  }

  // Track referral click
  trackReferralClick(referralCode: string, userEmail: string): {
    affiliateId: string;
    cookieName: string;
    cookieValue: string;
  } {
    const cookieValue = JSON.stringify({
      referralCode,
      userEmail,
      timestamp: Date.now(),
    });

    return {
      affiliateId: referralCode,
      cookieName: "affiliate_ref",
      cookieValue,
    };
  }

  // Calculate commission on sale
  calculateCommission(
    product: "agent" | "cryptotracker" | "aijobs",
    saleAmount: number
  ): number {
    const rate = this.COMMISSION_RATES[product];
    return Math.round(saleAmount * rate * 100) / 100; // Round to 2 decimals
  }

  // Record referral sale
  recordReferralSale(
    affiliateId: string,
    product: "agent" | "cryptotracker" | "aijobs",
    saleAmount: number,
    referredUserEmail: string
  ): AffiliateReferral {
    const commission = this.calculateCommission(product, saleAmount);

    return {
      id: `ref_${Date.now()}`,
      affiliateId,
      referredUserEmail,
      product,
      amount: saleAmount,
      commission,
      status: "pending",
      createdAt: new Date(),
    };
  }

  // Complete referral (after payment confirmed)
  completeReferral(referralId: string, timestamp: Date): AffiliateReferral {
    return {
      id: referralId,
      affiliateId: "",
      referredUserEmail: "",
      product: "agent",
      amount: 0,
      commission: 0,
      status: "completed",
      createdAt: new Date(),
      completedAt: timestamp,
    };
  }

  // Refund commission (if customer refunded)
  refundReferral(referralId: string): AffiliateReferral {
    return {
      id: referralId,
      affiliateId: "",
      referredUserEmail: "",
      product: "agent",
      amount: 0,
      commission: 0,
      status: "refunded",
      createdAt: new Date(),
    };
  }

  // Request payout
  requestPayout(
    affiliateId: string,
    amount: number,
    method: "stripe" | "bank_transfer" | "paypal"
  ): CommissionPayout {
    return {
      id: `payout_${Date.now()}`,
      affiliateId,
      amount,
      status: "pending",
      method,
      createdAt: new Date(),
    };
  }

  // Get affiliate dashboard stats
  getAffiliateStats(affiliate: AffiliateUser) {
    return {
      referralCode: affiliate.referralCode,
      referralLink: affiliate.referralLink,
      totalEarnings: affiliate.totalCommission,
      pendingEarnings: affiliate.pendingCommission,
      paidEarnings: affiliate.paidCommission,
      totalReferrals: affiliate.referralCount,
      conversionRate: `${(affiliate.conversionRate * 100).toFixed(2)}%`,
      status: affiliate.status,
      joinedDate: affiliate.joinedAt.toLocaleDateString(),
    };
  }
}

export const affiliateManager = new AffiliateManager();
