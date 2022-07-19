const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Suggestions = require("../models/Suggestions");
const router = express.Router();

// This deals with adding/removing admins and getting admins list from db

router.route("/suggest").post(
  expressAsyncHandler(async (req, res) => {
    const { email, category, suggestion } = req.body;

    if (email.includes("@iith.ac.in")) {
      const suggest = new Suggestions({
        email: email,
        category: category,
        suggestion: suggestion,
      });

      suggest.save((err, result) => {
        if (err) {
          return res.status(400).json({ title: "Somewhere went wrong" });
        }
        return res.status(200).json({ title: "Successfully noted down" });
      });
    } else {
      return res.status(400).json({ title: "Please use your IITH id" });
    }
  })
);

module.exports = router;
