const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

const router = Router();

// /api/auth

router.post(
  "/registration",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 6 chars.").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data",
        });

      const { email, password } = req.body;

      const isExist = await User.findOne({ email });
      if (isExist)
        return res.status(400).json({ message: "This user is already exist." });

      const hashedPassword = await bcrypt.hash(password, 6);
      const user = new User({ email, password: hashedPassword });
      console.log(user);
      await user.save();

      res.status(201).json({ message: "User created!" });
    } catch (error) {
      res.status(500).json({ message: "Something go wrong..." });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res
          .status(400)
          .json({ errors: errors.array(), message: "Ivalid login data." });

      let { email, password } = req.body;

      email = email.trim();

      const user = await User.findOne({ email });

      if (!user) return res.status(400).json({ message: "User not found." });

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Incorrect password." });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Something go wrong..." });
    }
  }
);

module.exports = router;
