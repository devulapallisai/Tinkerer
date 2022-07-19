const express = require("express");
const app = express();
const dotenv = require("dotenv");
app.use(express.json());
const cors = require("cors");
const user = require("./models/user");
const Admin = require("./models/Admin");
const Item = require("./models/items");
const connectDB = require("./db/db");
const itemsRoutes = require("./routes/itemRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/api/items", itemsRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use("/api/admins", adminRoutes);

const server = app.listen(PORT, () =>
  console.log(`Your server is running on http://localhost:${PORT}`)
);
