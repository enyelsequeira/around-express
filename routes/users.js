const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const path = require("path");
const { getUsers, getOneUser } = require("../controllers/userController");

//logic === /users, logic
router.get("/users", getUsers);

router.get("/users/:id", getOneUser);

module.exports = router;
