// Keeping the logic for the actual router are used in the controllers
const User = require("../models/User.js");
const fs = require("fs").promises;

const ERROR_CODE = 404;

const path = require("path");
const getFileContent = require("../helpers/getFileContent");
const { create } = require("../models/User.js");

//variable to the folders for the data
const pathData = path.join(__dirname, "..", "data", "users.json");

//logic to get users info
function getUsers(req, res) {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

//logic to get a specific user info
function getOneUser(req, res) {
  console.log(req.params.id);

  return User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User ID not found" });
      // res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: "could not create user" }));
};

// async function createUser(req, res) {
//   console.log(req.body);
//   const { name, about, avatar } = req.body;
//   console.log(name, about, avatar, "heloo form user");

//   const createdUser = new User({ name, about, avatar });
//   console.log(createdUser);

//   try {
//     await createdUser.save();

//     res.status(201).send({ message: "User successfully created." });
//   } catch (error) {
//     res.status(409).send({ message: error.message });
//   }
// }

const updateProfile = (req, res) => {
  return User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(404).send({ message: "User ID not found" });
    })
    .catch(() => res.status(500).send({ message: "could not create user" }));

  // req.user._id
};
// PATCH /users/me — update profile
// PATCH /users/me/avatar — update avatar

module.exports = {
  getUsers,
  getOneUser,
  createUser,
};
