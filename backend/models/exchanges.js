const mongoose = require("mongoose");

var exchangeSchema = new mongoose.Schema({
  exchange_id: {
    type: String,
  },
  website: {
    type: String,
  },
  name: {
    type: String,
  },
  data_start: {
    type: Date,
  },
  data_end: {
    type: Date,
  },
  data_quote_start: {
    type: Date,
  },
  data_quote_end: {
    type: Date,
  },
  data_orderbook_start: {
    type: Date,
  },
  data_orderbook_end: {
    type: Date,
  },
  data_trade_start: {
    type: Date,
  },
  data_trade_end: {
    type: Date,
  },
  data_symbols_count: {
    type: Number,
  },
  volume_1hrs_usd: {
    type: Number,
  },
  volume_1day_usd: {
    type: Number,
  },
  volume_1mth_usd: {
    type: Number,
  },
});
//Export the model
module.exports = mongoose.model("exchanges", exchangeSchema);
