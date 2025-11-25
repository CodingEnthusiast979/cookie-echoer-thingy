export default function handler(req, res) {
  const cookieHeader = req.headers.cookie || '';
  const cookies = {};

  cookieHeader.split(';').forEach(pair => {
    const [name, ...rest] = pair.trim().split('=');
    if (!name) return;
    cookies[name] = rest.join('=');
  });

  return res.status(200).json({
    cookies_received: cookies,
    raw_cookie_header: cookieHeader
  });
}
