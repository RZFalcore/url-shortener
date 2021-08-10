const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) return res.status(401).json({ message: "Not authorized." }); // 401 - Not authorized

    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    req.userToken = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized.", error });
  }
};
