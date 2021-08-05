const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get("port") || 4000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateInded: true,
    });

    app.listen(PORT, () => console.log(`App is running on port ${PORT}...`));
  } catch (e) {
    console.log("Server error:", e.message);
    proccess.exit(1);
  }
}

start();
