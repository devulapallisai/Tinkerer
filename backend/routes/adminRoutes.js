const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const router = express.Router();
const authorization = require("../middleware/authorization");
const Suggestions = require("../models/Suggestions");

// This deals with adding/removing admins and getting admins list from db

router.route("/fetchadmins").get(
  expressAsyncHandler(async (req, res) => {
    Admin.find({}, (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error fetching admins" });
      } else {
        const data = [];
        result.forEach((element) => {
          data.push(element.email);
        });
        return res.status(200).json(data);
      }
    });
  })
);

router.route("/").post(
  authorization,
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const admin = new Admin({
      email: email,
    });
    admin.save((err) => {
      if (err) {
        return res.status(400).json({ title: "Error Adding admins" });
      }
      return res.status(200).json({ title: "Added admin successfully" });
    });
  })
);

router.route("/remove").put(
  authorization,
  expressAsyncHandler(async (req, res) => {
    Admin.findOneAndDelete({ email: req.body.email }, (err, result) => {
      if (err) {
        return res.status(400).json({ title: "Error deleting admins" });
      } else {
        return res.status(200).json({ title: "Deleted admin successfully" });
      }
    });
  })
);

router.route("/allsuggestions").get(
  authorization,
  expressAsyncHandler(async (req, res) => {
    Suggestions.find({}, (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error while fetching data" });
      }
      return res.status(200).json(result);
    });
  })
);

module.exports = router;
