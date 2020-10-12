const express = require("express");
const fs = require("fs");
const path = require("path");

const {
  createCard,
  getCards,
  deleteCard,
  cardLike,
  deleteLikes,
} = require("../controllers/cardController");

const router = express.Router();
//router === /cards, (logic)
router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:id", deleteCard);
router.put("/cards/:id/likes", cardLike);
router.delete("cards/:id/likes", deleteLikes);

module.exports = router;
