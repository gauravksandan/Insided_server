const express = require("express");
const router = (module.exports = express.Router());
const { getUsers, getLeaderboardsByPoints,getLeaderboardsperiod,getLogedInUser,getArticles,getCategoriesList, getArticlesv2 } = require("./getData");
router.get("/api/users", getUsers);
router.get("/api/points", getLeaderboardsByPoints);
router.get("/api/articles", getArticles);
router.get("/api/users/:id", getLogedInUser);
router.get("/api/categories", getCategoriesList);
router.get("/api/articlesv2", getArticlesv2);

