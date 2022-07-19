const mongoose = require("mongoose");

const userModalSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  completedRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  pendingRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const user = mongoose.model("user", userModalSchema);
module.exports = user;
