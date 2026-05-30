const express = require("express");
const cors = require("cors");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", questionRoutes);

app.listen(PORT, () => {
  console.log(`Quiz backend running on http://localhost:${PORT}`);
});
