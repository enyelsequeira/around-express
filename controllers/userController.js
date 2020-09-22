// Keeping the logic for the actual router are used for controllers

const path = require("path");
const fs = require("fs").promises;
const getFileContent = require("../helpers/getFileContent");

const pathData = path.join(__dirname, "..", "data", "users.json");

function getUsers(req, res) {
  return getFileContent(pathData).then((users) => {
    res.send(users);
  });
}

function getOneUser(req, res) {
  return getFileContent(pathData).then((users) => {
    console.log(users);
    const user = users.find((user) => user._id === req.params.id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ message: "User ID not found" });
    // res.send(users);
  });
}

module.exports = {
  getUsers,
  getOneUser,
};
