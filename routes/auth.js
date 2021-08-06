const { Router } = require("express");

const router = Router();

// /api/auth

router.get("/register", async (req, res) => {
  try {
    const { login, password } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Something go wrong..." });
  }
});

router.get("/login", async (req, res) => {
  //
});

module.exports = router;
