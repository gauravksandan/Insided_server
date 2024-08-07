const express = require("express");
const router = (module.exports = express.Router());
const { getUsers } = require("index.js");
router.get("/users", getUsers);
