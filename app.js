const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const PORT = config.get("port") || 4000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}...`));
