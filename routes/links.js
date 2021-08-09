const { Router } = require("express");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/generate", async (req, res) => {
  try {
    //
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.userToken.userId });
    console.log("Links: ", links);
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.body.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

module.exports = router;
