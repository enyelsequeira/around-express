const express = require("express");
const router = express.Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/userController");
const { route } = require("./cards");

//logic === /users, logic
router.get("/users", getUsers);

router.get("/users/:id", getOneUser);
router.post("/users", createUser);
router.patch("/users/me", updateProfile);
router.patch("users/me/avatar", updateAvatar);

module.exports = router;
// http://localhost:3000/users/5f845d006c7b26589c33b82
