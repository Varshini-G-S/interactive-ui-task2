const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Restaurant API is running 🚀");
});

app.listen(4000, () => console.log("Server running at: http://localhost:4000"));
