const mongoose = require('mongoose');

const aiSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('ai', aiSchema);
