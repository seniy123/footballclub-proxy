import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const SUPABASE_URL = "https://mdtmvfgzfiumpbcbbbph.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_3GvuXwED8SHvoxeob5s1tQ_NfQc6fuc";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = SUPABASE_URL + req.url;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: req.method === "GET" ? undefined : req.body,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (err: any) {
    res.status(500).send({ error: err.message });
  }
}
