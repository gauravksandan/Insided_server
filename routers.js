const express = require("express");
const router = (module.exports = express.Router());
const { getUsers, getLeaderboardsByPoints,getLeaderboardsperiod } = require("./getData");
router.get("/api/users", getUsers);
router.get("/api/points", getLeaderboardsByPoints);
router.get("/api/period/weekly", getLeaderboardsperiod);





