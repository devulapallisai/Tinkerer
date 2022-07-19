const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Suggestions = require("../models/Suggestions");
const Item = require("../models/items");
const user = require("../models/user");
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

router.route("/borrow").post(
  expressAsyncHandler(async (req, res) => {
    const { email, itemName } = req.body;

    if (email.includes("@iith.ac.in")) {
      try {
        const curruser = await user.findOne({ email: email });
        const item = await Item.findOne({ itemName: itemName });
        if (item) {
          if (curruser) {
            user.findOneAndUpdate(
              { email: email },
              {
                $push: {
                  pendingRequests: item._id,
                },
              },
              (err, result) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ title: "Something went wrong" });
                }
                return res.status(200).json(result);
              }
            );
          } else {
            let arr = [];
            arr.push(item._id);
            const newuser = new user({
              email: email,
              completedRequests: [],
              pendingRequests: arr,
            });
            newuser.save((err, result) => {
              if (err) {
                console.log(err);
                return res.status(400).json({ title: "Something went wrong" });
              }
              return res.status(200).json(result);
            });
          }
        } else {
          return res.status(400).json({ error: "No item found" });
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ title: "Something went wrong" });
      }
    } else {
      return res.status(400).json({ title: "Please use your IITH id" });
    }
  })
);

router.route("/borrow/pending/:email").get(
  expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    if (email && email.includes("@iith.ac.in")) {
      try {
        const curruser = await user.findOne({ email: email });
        if (curruser) {
          curruser
            .populate("pendingRequests")
            // .populate("completedRequests")
            .then((p) => {
              return res.status(200).json(p);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: "Zero requests" });
            });
        } else {
          console.log("first");
          return res.status(404).json({ error: "No requests found" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Looks something wrong" });
      }
    } else {
      return res.status(400).json({ title: "Please use your IITH id" });
    }
  })
);

router.route("/borrow/completed/:email").get(
  expressAsyncHandler(async (req, res) => {
    const { email } = req.params;
    if (email && email.includes("@iith.ac.in")) {
      try {
        const curruser = await user.findOne({ email: email });
        if (curruser) {
          curruser
            .populate("completedRequests")
            // .populate("completedRequests")
            .then((p) => {
              return res.status(200).json(p);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: "Zero requests" });
            });
        } else {
          console.log("first");
          return res.status(404).json({ error: "No requests found" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Looks something wrong" });
      }
    } else {
      return res.status(400).json({ title: "Please use your IITH id" });
    }
  })
);

module.exports = router;
