import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.headers["authorization"];

  // if token is present or not
  if (!token) {
    return res.status(401).send("Unauthorised User!");
  }

  try {
    const payload = jwt.verify(token, "QGAUx47i4UhsUmZ7tUXQ9i88wAp1eM9l");

    console.log(payload);
    req.userId = payload.userId;
  } catch (err) {
    console.log("Error in verifying Token : ", err);

    return res.status(401).send("Invalid Token");
  }

  next();
}
