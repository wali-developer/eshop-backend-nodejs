import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({
      success: false,
      message: "No token provided.",
    });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err)
      return res.status(403).json({
        success: false,
        name: "JsonWebTokenError",
        message: "Invalid token.",
      });

    req.user = user;

    next();
  });
}
