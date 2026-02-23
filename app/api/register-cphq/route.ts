import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://aut.jobova.net/webhook/healthcare-lead";

export type RegisterCphqBody = {
  name: string;
  email: string;
  phone: string;
  specialty: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RegisterCphqBody>;
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const specialty = typeof body.specialty === "string" ? body.specialty.trim() : "";

    if (!name || !email || !phone || !specialty) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, specialty" },
        { status: 400 }
      );
    }

    const payload = { name, email, phone, specialty };
    const bodyStr = JSON.stringify(payload);
    const opts: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyStr,
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    };

    let res = await fetch(N8N_WEBHOOK_URL, opts);
    const location = res.headers.get("location");

    // Follow redirect (re-POST to preserve body)
    if (res.status >= 301 && res.status <= 308 && location) {
      const redirectUrl = location.startsWith("http") ? location : new URL(location, N8N_WEBHOOK_URL).href;
      res = await fetch(redirectUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyStr,
        signal: AbortSignal.timeout(15000),
      });
    }

    if (!res.ok) {
      const text = await res.text();
      console.error("n8n webhook error:", res.status, text);
      // Still return success so user is not blocked; webhook failure is logged
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("register-cphq API error:", e);
    // Timeout or network error calling n8n: accept registration and log
    return NextResponse.json({ success: true });
  }
}
