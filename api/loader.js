export default function handler(req, res) {
  try {
    const ua = (req.headers['user-agent'] || "").toLowerCase();

    // ✅ อนุญาตเฉพาะ Roblox / executor
    const allowed = (
      ua === "" ||
      ua.includes("roblox")
    );

    if (!allowed) {
      // ❌ คนเปิดเว็บ / browser / bot ทั่วไป
      return res.status(404).send("404 NOT FOUND");
    }

    // ✅ ถ้าใช่ Roblox → ส่ง loader
    res.setHeader("Content-Type", "text/plain");

    res.status(200).send(`
-- Loader
local url = "https://raw.githubusercontent.com/Teufkijdjd/Prisonlife-zeion/refs/heads/main/zeion-prisonl-life.txt"

local ok, data = pcall(function()
    return game:HttpGet(url)
end)

if ok and data then
    loadstring(data)()
else
    warn("Load failed")
end
    `);

  } catch (err) {
    return res.status(404).send("404 NOT FOUND");
  }
  
