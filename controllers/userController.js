/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
// Keeping the logic for the actual router are used in the controllers
const User = require("../models/User.js");

// logic to get users info
function getUsers(req, res) {
  return User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
}

// logic to get a specific user info
function getOneUser(req, res) {
  // console.log(req.params.id);

  return User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: "User id found" });
      // res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: "User not found" });
    });
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Updating profile patching
const updateProfile = (req, res) =>
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }

      return res.status(404).send({ message: "User ID not found" });
    })
    .catch((err) => {
      if (err.message === "Validation failed") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "could not create user" });
    });
// req.user._id
const updateAvatar = (req, res) =>
  User.findByIdAndUpdate(req.user._id, { avatar: newAvatar })
    .then((user) => {
      if (user) {
        return res.status(200).send({ data: user });
      }
      return res.status(404).send({ message: "User not found" });
    })
    .catch((err) => {
      if (err.message === "Validation failed") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "could not update Avatar" });
    });
// PATCH /users/me — update profile
// PATCH /users/me/avatar — update avatar

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
};
