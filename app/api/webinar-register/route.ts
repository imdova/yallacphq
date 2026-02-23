import { NextResponse } from "next/server";

const N8N_WEBHOOK_URL = "https://aut.jobova.net/webhook/healthcare-lead";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      specialty?: string;
    };
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

    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const timestamp = `${day}-${month}-${year} at ${hours}:${minutes}`;

    const payload = {
      name,
      email,
      phone,
      specialty,
      timestamp,
      source: "webinar",
    };
    const bodyStr = JSON.stringify(payload);
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyStr,
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });

    const location = res.headers.get("location");
    let finalRes = res;
    if (res.status >= 301 && res.status <= 308 && location) {
      const redirectUrl = location.startsWith("http") ? location : new URL(location, N8N_WEBHOOK_URL).href;
      finalRes = await fetch(redirectUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyStr,
        signal: AbortSignal.timeout(15000),
      });
    }

    if (!finalRes.ok) {
      const text = await finalRes.text();
      console.error("n8n webinar webhook error:", finalRes.status, text);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("webinar-register API error:", e);
    return NextResponse.json({ success: true });
  }
}
