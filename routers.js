const express = require("express");
const router = (module.exports = express.Router());
const { getUsers, getLeaderboardsByPoints } = require("./getData");
router.get("/api/users", getUsers);
router.get("/api/points", getLeaderboardsByPoints);
