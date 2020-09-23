// Keeping the logic for the actual router are used in the controllers

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

module.exports = {
  getUsers,
  getOneUser,
};
