// api/proxy.ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

// Настройки Supabase
const SUPABASE_URL = "https://mdtmvfgzfiumpbcbbbph.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3GvuXwED8SHvoxeob5s1tQ_NfQc6fuc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Получаем путь из query: /api/proxy?path=/rest/v1/teams
    const path = req.query.path as string;
    if (!path)
      return res
        .status(400)
        .send({ error: "Path query parameter is required" });

    const url = SUPABASE_URL + path;

    const response = await fetch(url, {
      method: req.method,
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: req.method === "GET" ? undefined : JSON.stringify(req.body),
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
