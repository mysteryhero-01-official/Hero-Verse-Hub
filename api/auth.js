export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password, email } = req.body || {};

  // 15-character access validation
  if (password && password.length !== 15) {
    return res.status(400).json({ success: false, message: 'Password must be exactly 15 characters' });
  }

  return res.status(200).json({
    success: true,
    token: 'hero_verified_' + Date.now(),
    user: { email: email || 'hero@command.io', role: 'admin', status: 'authenticated' }
  });
    }
