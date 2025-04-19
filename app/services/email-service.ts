// Email and OTP verification service using GetOTP platform
// This service handles email verification, OTP generation and verification

export interface EmailOptions {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

export interface SmsOptions {
  to: string
  message: string
}

// GetOTP API credentials
const API_KEY = "LkINYqT6ywpc05zXhtimsHBKlPxWAMnV"
const AUTH_TOKEN = "s3exauhl6i47qm5f1gcpjtoknr289zbw"
const API_BASE_URL = "https://api.getotp.dev/v1"

// Generate a random 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Generate a random verification token
export function generateVerificationToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Send an email with OTP using GetOTP API
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log("Sending email via GetOTP API:", options)

    // Prepare the email content based on template
    let emailContent = ""
    const emailSubject = options.subject

    switch (options.template) {
      case "2fa-code":
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Your Verification Code</h2>
            <p>Hello ${options.data.name},</p>
            <p>Your verification code for BLACKENSYS is:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold;">
              ${options.data.code}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Thank you,<br>BLACKENSYS Team</p>
          </div>
        `
        break
      case "verification":
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Verify Your Email Address</h2>
            <p>Hello ${options.data.name},</p>
            <p>Thank you for signing up with BLACKENSYS. Please click the button below to verify your email address:</p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="${options.data.verificationLink}" style="background-color: #4a4a4a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #4a4a4a;">${options.data.verificationLink}</p>
            <p>This link will expire in 24 hours.</p>
            <p>Thank you,<br>BLACKENSYS Team</p>
          </div>
        `
        break
      case "welcome":
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Welcome to BLACKENSYS!</h2>
            <p>Hello ${options.data.name},</p>
            <p>Thank you for joining BLACKENSYS. We're excited to have you on board!</p>
            <p>With your new account, you can:</p>
            <ul>
              <li>Stream and share short videos</li>
              <li>Store your files securely in the cloud</li>
              <li>Connect with creators and friends</li>
            </ul>
            <p>If you have any questions, please don't hesitate to contact our support team.</p>
            <p>Thank you,<br>BLACKENSYS Team</p>
          </div>
        `
        break
      case "reset-password":
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Reset Your Password</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password for your BLACKENSYS account. Please click the button below to reset your password:</p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="${options.data.resetLink}" style="background-color: #4a4a4a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #4a4a4a;">${options.data.resetLink}</p>
            <p>This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
            <p>Thank you,<br>BLACKENSYS Team</p>
          </div>
        `
        break
      default:
        emailContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">${options.subject}</h2>
            <p>Hello,</p>
            <p>${JSON.stringify(options.data)}</p>
            <p>Thank you,<br>BLACKENSYS Team</p>
          </div>
        `
    }

    // Make API call to GetOTP
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        to: options.to,
        subject: emailSubject,
        html: emailContent,
        from: "noreply@blackensys.com",
        fromName: "BLACKENSYS",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("GetOTP API error:", data)
      return false
    }

    console.log("Email sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Send an SMS with OTP using GetOTP API
export async function sendSms(options: SmsOptions): Promise<boolean> {
  try {
    console.log("Sending SMS via GetOTP API:", options)

    // Make API call to GetOTP
    const response = await fetch(`${API_BASE_URL}/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        to: options.to,
        message: options.message,
        from: "BLKNSYS",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("GetOTP API error:", data)
      return false
    }

    console.log("SMS sent successfully:", data)
    return true
  } catch (error) {
    console.error("Error sending SMS:", error)
    return false
  }
}

// Verify OTP via GetOTP API
export async function verifyOtp(identifier: string, code: string): Promise<boolean> {
  try {
    console.log("Verifying OTP via GetOTP API:", { identifier, code })

    // Make API call to GetOTP
    const response = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY,
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        identifier: identifier,
        code: code,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("GetOTP API error:", data)
      return false
    }

    console.log("OTP verified successfully:", data)
    return data.verified === true
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return false
  }
}

// Store verification codes temporarily (in a real app, this would be in a database)
const verificationCodes = new Map<string, { code: string; expires: number }>()

// Save a verification code
export function saveVerificationCode(identifier: string, code: string, expiresInMinutes = 10): void {
  const expires = Date.now() + expiresInMinutes * 60 * 1000
  verificationCodes.set(identifier, { code, expires })
}

// Verify a code
export function verifyCode(identifier: string, code: string): boolean {
  const stored = verificationCodes.get(identifier)

  if (!stored) {
    return false
  }

  if (Date.now() > stored.expires) {
    verificationCodes.delete(identifier)
    return false
  }

  if (stored.code !== code) {
    return false
  }

  // Code is valid, delete it so it can't be reused
  verificationCodes.delete(identifier)
  return true
}
