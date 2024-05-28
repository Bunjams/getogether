const express = require("express");
const StreamChat = require("stream-chat").StreamChat;
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

const apiKey = "gm9bgzyqhwyd";
const apiSecret =
  "uyyaahbfabkfbe4xyj32ajfpvf29ub87f68j6kkjnfeum3p75mqnn7t5ncjc2m8u";

app.post("/token", (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  const token = serverClient.createToken(userId);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
