const { Router } = require("express");
const Link = require("../models/Link");

const router = Router();

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (link) {
      link.clicks++;
      await link.save();
      res.redirect(link.from);
    }

    res.status(404).json({ message: "Link not found." });
  } catch (error) {
    res.status(500).json({ message: "Something go wrong!", error });
  }
});

module.exports = router;
