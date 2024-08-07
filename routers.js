const express = require("express");
const router = (module.exports = express.Router());
const { getUsers } = require("./index");
router.get("/users", getUsers);
