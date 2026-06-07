  export default function handler(req, res) {
  try {
    const ua = (req.headers["user-agent"] || "").toLowerCase();

    const allowed =
      ua === "" ||
      ua.includes("roblox");

    if (!allowed) {
      return res.status(404).send("404 NOT FOUND");
    }

    res.setHeader("Content-Type", "text/plain");

    return res.status(200).send(`-- Loader
local url = "https://raw.githubusercontent.com/Teufkijdjd/Prisonlife-zeion/main/zeion-prisonl-life.txt"

local ok, data = pcall(function()
    return game:HttpGet(url)
end)

if ok and data then
    loadstring(data)()
else
    warn("Load failed")
end`);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
  }
