import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

// Твой оригинальный Supabase URL и анонимный ключ
const SUPABASE_URL = "https://mdtmvfgzfiumpbcbbbph.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3GvuXwED8SHvoxeob5s1tQ_NfQc6fuc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = `${SUPABASE_URL}${req.url?.replace(/^\/api\/proxy/, "") ?? ""}`;

    // Заголовки с ключом Supabase
    const headers: Record<string, string> = {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    };

    const response = await fetch(url, {
      method: req.method,
      headers,
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    // Пробросим ответ от Supabase напрямую
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
