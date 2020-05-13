const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  price: { type: String },
  imageLink: {type: String},
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true }
});

module.exports = mongoose.model("Post", postSchema);



