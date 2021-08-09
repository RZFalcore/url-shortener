const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const linksRouter = require("./routes/links");

const app = express();
const PORT = config.get("port") || 4000;

// Middlewares
app.use(express.json({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/links", linksRouter);

// App start
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`App is running on port ${PORT}...`));
  } catch (e) {
    console.log("Server error:", e.message);
    process.exit(1);
  }
}

start();
