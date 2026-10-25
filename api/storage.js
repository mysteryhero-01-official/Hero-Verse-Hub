let memoryStore = {
  projects: ["Voltage Hero", "Desi GTA", "16D Audio Lab"],
  userProfile: { username: "Hero", level: "Admin" }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const body = req.body || {};
    memoryStore = { ...memoryStore, ...body };
    return res.status(200).json({ success: true, data: memoryStore });
  }

  // GET data trigger
  return res.status(200).json({ success: true, data: memoryStore });
                               }
