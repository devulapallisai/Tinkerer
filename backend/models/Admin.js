const mongoose = require("mongoose");

const adminModalSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
});

const Admin = mongoose.model("Admin", adminModalSchema);
module.exports = Admin;
