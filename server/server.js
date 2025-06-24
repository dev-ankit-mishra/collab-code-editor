// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/api/run", async (req, res) => {
  try {
    const { language = "javascript", code } = req.body;
    console.log("Received code:", code);

    const result = await axios.post("https://emkc.org/api/v2/piston/execute", {
      language,
      version: "default",
      files: [{ name: "main", content: code }],
    });

    console.log("Piston response:", result.data);
    res.json(result.data);
  } catch (err) {
    console.error("Error in /api/run:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
