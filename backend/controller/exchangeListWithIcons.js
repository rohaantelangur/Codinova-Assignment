const asyncHandler = require("express-async-handler");
const exchanges = require("../models/exchanges");

const exchangeListWithIcons = asyncHandler(async (req, res) => {
  try {
    const page = Math.abs(req.query.page) || 1;
    const limit = Math.abs(req.query.limit) || 10;
    const exchange_id = req.query.exchange_id || "";
    const order = req.query.order;
    const skip = limit * (page - 1);
    const obj = exchanges.aggregate([
      {
        $lookup: {
          from: "icons",
          localField: "exchange_id",
          foreignField: "exchange_id",
          as: "url",
        },
      },
      {
        $addFields: {
          url: {
            $arrayElemAt: ["$url.url", 0],
          },
        },
      },
      {
        $project: {
          _id: 0,
          exchange_id: 1,
          name: 1,
          url: 1,
          website: 1,
          volume_1day_usd: 1,
        },
      },
      {
        $sort: { volume_1day_usd: order == "asc" ? 1 : -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    if (exchange_id.length > 0) {
      obj._pipeline.push({
        $match: {
          exchange_id: { $regex: exchange_id, $options: "i" },
        },
      });
    }

    const result = await obj;

    res.json({
      success: true,
      length: result.length,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { exchangeListWithIcons };
