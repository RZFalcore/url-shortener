const { Router } = require("express");
const Link = require("../models/Link");

const router = Router();

router.post("/generate", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

router.get("/", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

module.exports = router;
