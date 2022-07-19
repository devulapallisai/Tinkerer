const e = require("express");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const authorization = require("../middleware/authorization");
const Item = require("../models/items");

const router = express.Router();

router.route("/").get(
  expressAsyncHandler(async (req, res) => {
    Item.find({}, (err, result) => {
      if (err) {
        return res.status(400).json({ error: "Error while fetching data" });
      }
      return res.status(200).json(result);
    });
  })
);

router.route("/").post(
  authorization,
  expressAsyncHandler(async (req, res) => {
    const { name, no, cat, pic } = req.body;
    const item = new Item({
      itemName: name,
      total: no,
      available: no,
      category: cat,
      pic: pic,
    });
    item.save((err) => {
      if (err) {
        return res.status(400).json({ error: "Error with new item creation." });
      }
      return res.status(200).json(item);
    });
  })
);

router.route("/update").put(
  authorization,
  expressAsyncHandler(async (req, res) => {
    const { dname, name, total, no, cat } = req.body;
    try {
      const item = await Item.findOneAndUpdate(
        { itemName: dname },
        { itemName: name, total: total, available: no, category: cat },
        { new: true }
      );
      if (item) {
        return res.status(200).json(item);
      } else {
        return res.status(404).json({ error: "No such item found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Trouble with server" });
    }
  })
);

router.route("/getitem").post(
  authorization,
  expressAsyncHandler(async (req, res) => {
    const { itemname } = req.body;
    if (itemname === "") {
      return res.status(402).json({ error: "Invalid search item" });
    }
    try {
      const item = await Item.findOne({ itemName: itemname });
      if (item) {
        return res.status(200).json(item);
      }
      return res.status(404).json({ error: "No item found" });
    } catch (error) {
      return res.status(500).json({ error: "Trouble with server" });
    }
  })
);

router.route("/remove").put();

module.exports = router;
