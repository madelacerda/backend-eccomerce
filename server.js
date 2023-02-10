const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const routes = require("./routes");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(process.env.PORT, () => {
  console.log(`listen in port ${process.env.PORT}`);
});
