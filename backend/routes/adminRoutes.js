const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const User = require("../models/user");
const router = express.Router();
const authorization = require("../middleware/authorization");
const Suggestions = require("../models/Suggestions");
const Item = require("../models/items");

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

router.route("/pendingrequests").get(
  authorization,
  expressAsyncHandler(async (req, res) => {
    User.find({}, async (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error while fetching data" });
      }
      var arr = [];
      const items = await Item.find({});
      for (let index = 0; index < result.length; index++) {
        const element = result[index].pendingRequests;
        for (let p = 0; p < element.length; p++) {
          const ele = element[p];
          for (let k = 0; k < items.length; k++) {
            if (items[k]._id.toString() == ele._id.toString()) {
              const newobj = new Object(items[k]);
              // newobj["email"] = result[index].email;
              arr.push([newobj, result[index].email]);
              break;
            }
            console.log(ele._id, items[k]._id);
          }
        }
      }
      console.log(arr);
      return res.status(200).json(arr);
    });
  })
);

router.route("/approvereq").put(
  authorization,
  expressAsyncHandler(async (req, res) => {
    const { id, email } = req.body;
    User.findOneAndUpdate(
      { email: email },
      {
        $push: {
          completedRequests: id,
        },
        $pull: {
          pendingRequests: id,
        },
      },
      (err, result) => {
        if (err) {
          return res.status(400).json({ error: "Error" });
        }
        Item.findOne({ _id: id }, (err, resItem) => {
          if (err) {
          } else {
            if (resItem) {
              if (resItem.available >= 1) {
                Item.findByIdAndUpdate(id, {
                  available: resItem.available - 1,
                });
              }
            }
          }
        });
        return res.status(200).json({ title: "Success" });
      }
    );
  })
);

module.exports = router;
