// Email service for Agent Marketplace
// Supports: Resend, SendGrid, SMTP

// Note: nodemailer requires '@types/nodemailer' - using mock for now
// import nodemailer from "nodemailer";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

class Mailer {
  private provider: "resend" | "sendgrid" | "smtp" = "smtp";
  private transporter: any;

  constructor() {
    this.initProvider();
  }

  private initProvider() {
    const provider = process.env.EMAIL_PROVIDER || "smtp";
    this.provider = provider as any;

    if (provider === "resend") {
      // Resend API integration
      // Requires: RESEND_API_KEY
    } else if (provider === "sendgrid") {
      // SendGrid integration
      // Requires: SENDGRID_API_KEY
    } else {
      // SMTP fallback (mock for now)
      this.transporter = {
        sendMail: async (options: any) => ({
          messageId: `msg_${Date.now()}`,
        }),
      };
    }
  }

  async send(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (this.provider === "resend") {
        return await this.sendViaResend(options);
      } else if (this.provider === "sendgrid") {
        return await this.sendViaSendGrid(options);
      } else {
        return await this.sendViaSMTP(options);
      }
    } catch (error) {
      console.error("Email send error:", error);
      return {
        success: false,
        error: String(error),
      };
    }
  }

  private async sendViaResend(options: EmailOptions) {
    // TODO: Implement Resend API call
    return {
      success: false,
      error: "Resend not configured",
    };
  }

  private async sendViaSendGrid(options: EmailOptions) {
    // TODO: Implement SendGrid API call
    return {
      success: false,
      error: "SendGrid not configured",
    };
  }

  private async sendViaSMTP(options: EmailOptions) {
    const result = await this.transporter.sendMail({
      from: options.from || process.env.EMAIL_FROM || "noreply@example.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  }

  async sendSellerAlert(sellerEmail: string, newAgent: any) {
    const html = `
      <h2>New Agent Listed!</h2>
      <p>An agent matching your interests was just listed:</p>
      <p><strong>${newAgent.name}</strong> - $${newAgent.price}/month</p>
      <p>${newAgent.description}</p>
      <a href="${process.env.NEXTAUTH_URL}/agents/${newAgent.id}">View Agent</a>
    `;

    return this.send({
      to: sellerEmail,
      subject: `New Agent: ${newAgent.name}`,
      html,
    });
  }

  async sendBuyerAlert(buyerEmail: string, newJob: any) {
    const html = `
      <h2>New Job Listing!</h2>
      <p>A job matching your skills was just posted:</p>
      <p><strong>${newJob.title}</strong> - $${newJob.salary}/year</p>
      <p>${newJob.description}</p>
      <a href="${process.env.NEXTAUTH_URL}/jobs/${newJob.id}">View Job</a>
    `;

    return this.send({
      to: buyerEmail,
      subject: `New Job: ${newJob.title}`,
      html,
    });
  }

  async sendPaymentConfirmation(email: string, amount: number, product: string) {
    const html = `
      <h2>Payment Confirmed</h2>
      <p>Thank you for your purchase!</p>
      <p><strong>Amount:</strong> $${amount}</p>
      <p><strong>Product:</strong> ${product}</p>
      <p>Your account is now active. <a href="${process.env.NEXTAUTH_URL}/dashboard">Go to Dashboard</a></p>
    `;

    return this.send({
      to: email,
      subject: `Payment Confirmed - $${amount}`,
      html,
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    const html = `
      <h2>Welcome to Agent Marketplace!</h2>
      <p>Hi ${name},</p>
      <p>Thanks for signing up. You can now:</p>
      <ul>
        <li>List your AI agents</li>
        <li>Browse and buy agents</li>
        <li>Track your earnings</li>
        <li>Join our affiliate program</li>
      </ul>
      <a href="${process.env.NEXTAUTH_URL}/dashboard">Get Started</a>
    `;

    return this.send({
      to: email,
      subject: "Welcome to Agent Marketplace!",
      html,
    });
  }
}

export const mailer = new Mailer();
