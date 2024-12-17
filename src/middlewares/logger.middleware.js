import fs from "fs";

const fsPromise = fs.promises;

async function log(logData) {
  try {
    logData = new Date() + logData + "\n";

    await fsPromise.appendFile("logs.txt", logData);
  } catch (err) {
    console.log(err);
  }
}

async function loggerMiddleware(req, res, next) {
  const logData = `, URL : ${req.url}, Data is : ${JSON.stringify(req.body)}`;
  await log(logData);

  next();
}

export default loggerMiddleware;
