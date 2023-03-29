const express = require("express");
const { exchangeListWithIcons } = require("../controller/exchangeListWithIcons");
const router = express.Router();

router.get('/exchange-list', exchangeListWithIcons)

module.exports = router