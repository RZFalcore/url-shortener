const path = require("path");
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");
const linksRouter = require("./routes/links");
const redirectRouter = require("./routes/redirect");

const app = express();
const PORT = process.env.PORT || config.get("port");

// Middlewares
app.use(express.json({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/links", linksRouter);
app.use("/to", redirectRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// App start
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI || config.get("mongoUri"), {
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
