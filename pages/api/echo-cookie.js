export default function handler(req, res) {
  const origin = req.headers.origin || "*";

  // --- CORS HEADERS ---
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  // ---------------------

  // cookie logic
  const cookieHeader = req.headers.cookie || "";
  const cookies = {};

  cookieHeader.split(";").forEach(pair => {
    const [name, ...rest] = pair.trim().split("=");
    if (!name) return;
    cookies[name] = rest.join("=");
  });

  res.status(200).json({
    cookies_received: cookies,
    raw_cookie_header: cookieHeader
  });
}
