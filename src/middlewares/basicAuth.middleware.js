import UserModel from "../features/user/user.model.js";

function basicAuthorizer(req, res, next) {
  // 1. check the authHeader is empty of not
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.status(401).send("No Authorization Details Found!");
  }

  console.log(authHeaders);
  // 2. extract the base64Credentials
  const base64Credentials = authHeaders.replace("Basic ", "");
  console.log(base64Credentials);

  // 3. decode the base64credentials
  const decodedCreds = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );

  console.log(decodedCreds);

  const creds = decodedCreds.split(":"); // "username:password"
  const email = creds[0];
  const password = creds[1];

  const user = UserModel.signIn({ email, password });

  if (!user) {
    return res.status(401).send("Invalid Credentials!");
  }

  next();
}

export default basicAuthorizer;
