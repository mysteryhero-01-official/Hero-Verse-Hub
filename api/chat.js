export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, prompt } = req.body || {};
  const query = message || prompt || 'Hello';
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ reply: 'Neural AI online. Please configure GEMINI_API_KEY in Vercel settings.' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }]
        })
      }
    );
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Command acknowledged.';
    return res.status(200).json({ reply, text: reply });
  } catch (err) {
    return res.status(500).json({ error: 'AI terminal failed to generate response.' });
  }
        }
    
