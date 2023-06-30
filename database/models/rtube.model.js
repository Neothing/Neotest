const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    name: String,
    author: {
      name: String,
      subname: String,
      channel: String,
    },
    thumbnails: String,
    duration: String,
    mp4: String,
    mp3: String,
    expired: Number,
  },
  { timestamps: true }
);

const NeoTube = mongoose.model("NeoTube", schema);
module.exports = NeoTube;
