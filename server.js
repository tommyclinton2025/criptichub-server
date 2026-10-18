
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CripTicHub Server Finder is online!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    name: "CripTicHub Server Finder"
  });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`CripTicHub server running on port ${port}`);
});
