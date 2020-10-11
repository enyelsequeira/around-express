const path = require("path");
const fs = require("fs");
const getFileContent = require("../helpers/getFileContent");

const cardsData = path.join(__dirname, "..", "data", "cards.json");
//logic to get cards
function getCards(req, res) {
  return getFileContent(cardsData)
    .then(function (card) {
      res.send(card);
    })
    .catch(() => {
      res.status(500).send("Something broke!");
    });
}

module.exports = getCards;
