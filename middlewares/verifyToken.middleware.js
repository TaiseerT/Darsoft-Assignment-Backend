import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
