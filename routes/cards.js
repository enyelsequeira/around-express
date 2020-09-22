const express = require("express");
const fs = require("fs");
const path = require("path");

const getCards = require("../controllers/cardController");

const router = express.Router();
//router === /cards, (logic)
router.get("/cards", getCards);

module.exports = router;
