const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  aiId: {
    type: String,
    required: [true],
  },
  created: {
    type: Number,
    required: [true],
  },
  choices: {
    text: String,
    index: Number,
    logprobs: String,
    finish_reason: String,
  },

  usage: {
    prompt_tokens: Number,
    completion_tokens: Number,
    total_tokens: Number,
  },

  subject: {
    type: String,
    required: [true, "The name field must be filled in"],
    minlength: [2, "The minimum length of the name field is 2"],
    maxlength: [30, "The maximum length of the name field is 3"],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likes: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("card", cardSchema);
