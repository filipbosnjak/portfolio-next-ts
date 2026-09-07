import { NextResponse } from "next/server";
import { google } from "googleapis";
import type { ContactPayload } from "@/types/types";

/**
 * Sends mail via Gmail API using OAuth2 (refresh token).
 *
 * Required env:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 * - GOOGLE_REFRESH_TOKEN (from one-time OAuth with scope https://www.googleapis.com/auth/gmail.send)
 *
 * Optional:
 * - GOOGLE_REDIRECT_URI — must match the OAuth client / token exchange (default: OAuth Playground URL)
 * - GMAIL_SENDER_EMAIL — mailbox that owns the refresh token (default: filipo.bosnjak@gmail.com)
 */
const INBOX = "filipo.bosnjak@gmail.com";

function encodeRfc2047Subject(subject: string): string {
  const encoded = Buffer.from(subject, "utf-8").toString("base64");
  return `=?UTF-8?B?${encoded}?=`;
}

function buildMime(opts: {
  senderMailbox: string;
  senderDisplayName: string;
  replyTo: string;
  subject: string;
  textBody: string;
}): string {
  const name = opts.senderDisplayName.replace(/[\r\n"\\]/g, "").slice(0, 200);
  const lines = [
    `From: ${name} <${opts.senderMailbox}>`,
    `To: ${INBOX}`,
    `Reply-To: ${opts.replyTo}`,
    `Subject: ${encodeRfc2047Subject(opts.subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    opts.textBody,
  ];
  return lines.join("\r\n");
}

function toRawBase64Url(mime: string): string {
  return Buffer.from(mime, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body", error: true },
      { status: 400 },
    );
  }

  const from = payload.from?.trim();
  const senderName = payload.senderName?.trim();
  const subject = payload.subject?.trim();
  const body = payload.body?.trim();

  if (!from || !senderName || !subject || !body) {
    return NextResponse.json(
      {
        message: "Please fill in name, email, subject, and message.",
        error: true,
      },
      { status: 400 },
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.error(
      "sendemail: missing GOOGLE_CLIENT_ID / SECRET / REFRESH_TOKEN",
    );
    return NextResponse.json(
      { message: "Email is not configured on the server.", error: true },
      { status: 500 },
    );
  }

  const senderMailbox = process.env.GMAIL_SENDER_EMAIL?.trim() || INBOX;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    "https://developers.google.com/oauthplayground";

  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri,
    );
    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const subjectWithSender = `[from ${from}] ${subject}`;

    const mime = buildMime({
      senderMailbox,
      senderDisplayName: `${senderName} (portfolio contact form)`,
      replyTo: from,
      subject: subjectWithSender,
      textBody: [`From: ${senderName} <${from}>`, "", body].join("\n"),
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: toRawBase64Url(mime),
      },
    });

    return NextResponse.json({ message: "Sent", error: false });
  } catch (err) {
    // Log only the message: the full gaxios error dumps the refresh token.
    const message = err instanceof Error ? err.message : String(err);
    console.error("sendemail Gmail API error:", message);
    return NextResponse.json(
      { message: "Could not send email. Try again later.", error: true },
      { status: 502 },
    );
  }
}
