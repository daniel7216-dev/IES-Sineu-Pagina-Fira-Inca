

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");


const app = express();
app.use(cors());
app.use(express.json());

// Serveix el fitxer HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


const openai = new OpenAI({
  apiKey: "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"
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    });
    const path = require("path");

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "index.html"));
    });
    
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ reply: "Hi ha hagut un error al servidor." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("Servidor funcionant a http://localhost:3000");
});
