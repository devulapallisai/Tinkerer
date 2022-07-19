const mongoose = require("mongoose");

const itemModalSchema = mongoose.Schema({
  itemName: {
    type: String,
    trim: true,
  },
  total: Number,
  available: Number,
  category: String,
  pic: {
    type: String,
    default: "https://images.app.goo.gl/LWNjN1WCbeGwpjSUA",
  },
});

const Item = mongoose.model("Item", itemModalSchema);
module.exports = Item;
