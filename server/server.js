import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import csrf from "csurf";

const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connect"))
  .catch((err) => console.log("DB Cconnect err", err));

//creat express app
const app = express();

//midd
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
