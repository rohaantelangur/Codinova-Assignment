const mongoose = require("mongoose");

var iconSchema = new mongoose.Schema({
  exchange_id: {
    type: String,
  },
  url: {
    type: String,
  }
});
//Export the model
module.exports = mongoose.model("icons", iconSchema);
