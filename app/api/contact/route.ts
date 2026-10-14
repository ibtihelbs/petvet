import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, suburb, serviceType, message } =
      body;

    // --- Validation ---
    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 },
      );
    }

    const phoneDigits = String(phone).replace(/\D/g, "");
    if (phoneDigits.length < 8) {
      return NextResponse.json(
        { error: "Numéro de téléphone invalide." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    // En dev sans Resend configuré : on log et on retourne succès
    if (!apiKey || !toEmail) {
      console.warn(
        "[contact] RESEND_API_KEY ou CONTACT_TO_EMAIL non configuré — lead loggé :",
        body,
      );
      return NextResponse.json({ ok: true, delivered: false });
    }

    const resend = new Resend(apiKey);

    const subject = `Nouvelle demande de rendez-vous — ${firstName} ${lastName}`;

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "PET VET <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject,
      text: [
        `Nom : ${firstName} ${lastName}`,
        `Téléphone : ${phone}`,
        `Email : ${email}`,
        suburb ? `Ville : ${suburb}` : null,
        serviceType ? `Service : ${serviceType}` : null,
        "",
        "Message :",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B3A4B; margin-bottom: 16px;">
            Nouvelle demande de rendez-vous
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 120px;">Nom :</td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Téléphone :</td>
              <td style="padding: 8px 0;">
                <a href="tel:${phone}" style="color: #C96A4B;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600;">Email :</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${email}" style="color: #C96A4B;">${email}</a>
              </td>
            </tr>
            ${
              suburb
                ? `<tr>
                    <td style="padding: 8px 0; font-weight: 600;">Ville :</td>
                    <td style="padding: 8px 0;">${suburb}</td>
                  </tr>`
                : ""
            }
            ${
              serviceType
                ? `<tr>
                    <td style="padding: 8px 0; font-weight: 600;">Service :</td>
                    <td style="padding: 8px 0;">${serviceType}</td>
                  </tr>`
                : ""
            }
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #E5E5E5;" />
          <h3 style="color: #1B3A4B; margin-bottom: 8px;">Message :</h3>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${message}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #E5E5E5;" />
          <p style="font-size: 12px; color: #999;">
            Ce message a été envoyé depuis le formulaire de contact de petvet.tn
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi. Veuillez réessayer." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
