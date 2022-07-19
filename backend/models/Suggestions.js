const mongoose = require("mongoose");

const suggestModalSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
  },
  suggestion: String,
  category: String,
});

const Suggestions = mongoose.model("Suggestions", suggestModalSchema);
module.exports = Suggestions;
