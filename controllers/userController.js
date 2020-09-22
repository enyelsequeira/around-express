// Keeping the logic for the actual router are used in the controllers

const path = require("path");
const fs = require("fs").promises;
const getFileContent = require("../helpers/getFileContent");

//variable to the folders for the data
const pathData = path.join(__dirname, "..", "data", "users.json");

//logic to get users info
function getUsers(req, res) {
  return getFileContent(pathData).then((users) => {
    res.send(users);
  });
}
//logic to get a specific user info
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
