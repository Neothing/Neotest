const mongoose = require("mongoose");

module.exports.connect = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[ DATABASE ] Connected ✓");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
