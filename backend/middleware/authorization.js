const expressAsyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");

const authorization = expressAsyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const email = req.headers.authorization.split(" ")[1];
    try {
      Admin.findOne({ email: email }, (err, result) => {
        if (err) {
          return res.status(400).json({ error: "Authorization error" });
        }
        if (result) {
          next();
        } else {
          return res.status(400).json({ error: "Authorization error" });
        }
      });
    } catch (err) {
      return res.status(402).json({ error: "Error with server" });
    }
  } else {
    return res.status(400).json({ error: "Authorization error" });
  }
});

module.exports = authorization;
