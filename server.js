
const express = require("express");

const app = express();
app.use(express.json());

const PLACE_ID = "109983668079237";

app.get("/", (req, res) => {
  res.send("CripTicHub Server Finder is online!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    name: "CripTicHub Server Finder"
  });
});

app.get("/api/servers", async (req, res) => {
  try {
    const url = new URL(
      `https://games.roblox.com/v1/games/${PLACE_ID}/servers/Public`
    );

    url.searchParams.set("sortOrder", "Desc");
    url.searchParams.set("limit", "100");

    if (typeof req.query.cursor === "string") {
      url.searchParams.set("cursor", req.query.cursor);
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: "Roblox server list is unavailable"
      });
    }

    const result = await response.json();

    res.json({
      game: "Steal a Brainrot",
      servers: (result.data || []).map(server => ({
        id: server.id,
        players: server.playing,
        maxPlayers: server.maxPlayers,
        joinUrl:
          `https://www.roblox.com/games/${PLACE_ID}/Steal-a-Brainrot?gameInstanceId=${encodeURIComponent(server.id)}`
      })),
      nextPageCursor: result.nextPageCursor || null
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not load servers"
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`CripTicHub server running on port ${port}`);
});
