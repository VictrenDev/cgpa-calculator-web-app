import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(req: Request) {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    // Prisma query needs await
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ success: true }); // silently ignore if user not found

    const token = crypto.randomBytes(32).toString("hex");
    const expire = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.user.update({
        where: { email },
        data: { resetToken: token, resetTokenExpiry: expire },
    });
    const name = user.firstName + " " + user.lastName;

    const resetURL = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/auth/reset-password?token=${token}`;
    const emailTemplate = `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <!-- Main container -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <!-- Content container -->
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 30px 30px 20px 30px; background-color: #4a6cf7; border-radius: 8px 8px 0 0; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Password Reset Request</h1>
                        </td>
                    </tr>
                    
                    <!-- Body content -->
                    <tr>
                        <td style="padding: 30px;">
                            <p style="margin: 0 0 20px 0; color: #333333; line-height: 1.6;">Hello ${name},</p>
                            <p style="margin: 0 0 20px 0; color: #333333; line-height: 1.6;">We received a request to reset your password. Click the button below to create a new password:</p>
                            
                            <!-- Reset button -->
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${resetURL}" style="background-color: #4a6cf7; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 20px 0; color: #666666; line-height: 1.6; font-size: 14px;">If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
                            
                            <p style="margin: 20px 0 0 0; color: #333333; line-height: 1.6;">Thanks,<br>The CGPA Calculator Team</p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                            <p style="margin: 0 0 10px 0; color: #666666; font-size: 12px;">&copy; 2023 [Company Name]. All rights reserved.</p>
                            <p style="margin: 0; color: #666666; font-size: 12px;">
                                <a href="[Privacy Policy Link]" style="color: #4a6cf7; text-decoration: none;">Privacy Policy</a> | 
                                <a href="[Contact Link]" style="color: #4a6cf7; text-decoration: none;">Contact Us</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>`;
    // Setup transporter correctly
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    } as SMTPTransport.Options);

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: "Password Reset",
            html: emailTemplate,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error sending email:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
