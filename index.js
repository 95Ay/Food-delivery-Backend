const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/foods", require("./routes/food"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/comments", require("./routes/comment"));
app.use("/api/contact", require("./routes/contact"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
