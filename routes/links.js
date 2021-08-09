const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");

const router = Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;
    const code = shortid.generate();
    const to = baseUrl + "/to/" + code;

    const existingLink = await Link.findOne({ from });

    if (existingLink) {
      return res.json({ link: existingLink });
    } else {
      const userId = req.userToken.userId;
      const link = new Link({ from, to, code, owner: userId });

      await link.save();

      res.statuc(201).json({ link });
    }
  } catch (error) {
    res.status(500).json({ message: "Something go wrong! in links", error });
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

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.body.id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!" });
  }
});

module.exports = router;
