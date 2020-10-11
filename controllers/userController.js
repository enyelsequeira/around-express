// Keeping the logic for the actual router are used in the controllers
const User = require("../models/User.js");

const path = require("path");
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
  return getFileContent(pathData)
    .then((users) => {
      const user = users.find((userName) => userName._id === req.params.id);
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User ID not found" });
      // res.send(users);
    })
    .catch(() => {
      res.status(500).send("Something broke!");
    });
}

async function createUser(req, res) {
  const { name, about, avatar } = req.body;

  const createdUser = new User({ name, about, avatar });

  try {
    await createdUser.save();

    res.status(201).json({ message: "User successfully created." });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

module.exports = {
  getUsers,
  getOneUser,
  createUser,
};
