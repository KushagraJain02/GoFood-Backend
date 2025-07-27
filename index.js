const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mongoDB = require("./db");

// Connect to MongoDB
mongoDB();

// ✅ Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Define routes
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

// ✅ Root test route
app.get("/", (req, res) => {
  res.send("Hello World!-----");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
