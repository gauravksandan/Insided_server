const express = require("express");
const router = (module.exports = express.Router());
const { getUsers } = require("./getData");
router.get("/users", getUsers);
