import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, suburb, serviceType, message } =
      body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    // If Resend isn't configured yet (e.g. local dev before you've set up
    // an account), log the lead instead of failing outright — so you can
    // still test the form end-to-end while the email piece is pending.
    if (!apiKey || !toEmail) {
      console.warn(
        "[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not set — logging lead instead of emailing it:",
        body,
      );
      return NextResponse.json({ ok: true, delivered: false });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "PetVet Website <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `New quote request from ${firstName} ${lastName}`,
      text: [
        `Name: ${firstName} ${lastName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        suburb ? `Suburb: ${suburb}` : null,
        serviceType ? `Service: ${serviceType}` : null,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your enquiry. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
