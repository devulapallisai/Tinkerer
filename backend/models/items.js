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
    default:
      "https://res.cloudinary.com/dotdtp38v/image/upload/v1658253534/Tinkerer_head_crtznp.jpg",
  },
});

const Item = mongoose.model("Item", itemModalSchema);
module.exports = Item;
