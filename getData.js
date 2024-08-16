const express = require('express');
const axios = require('axios');

const accessToken = async (req, res)=>{
  try {
    const response = await axios.post(process.env.TOKEN_URL, new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: 'read'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const access_token = response.data.access_token;
    return  access_token;
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
};

const getLogedInUser = async (req, res) => {
  try {
    const access_token = await accessToken(); // Ensure this is valid and returns a token
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log("req", req);
    console.log("user", userId);
    console.log("typeoffuser", typeof userId);

    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
};

const getUsers = async (req, res) => {
  const access_token = await accessToken();
  try {
    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
};

const getArticles = async (req, res) => {
  const access_token = await accessToken();
  try {
    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/v2/articles`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
};

const getLeaderboardsByPoints = async (req, res) => {
  const access_token = await accessToken();
  try {

    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/leaderboard`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
}

const getLeaderboardsperiod = async (req, res) => {
  const access_token = await accessToken();
  try {

    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/leaderboard/weekly`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
}


module.exports = {
 getUsers,
 getLeaderboardsByPoints,
 getLeaderboardsperiod,
 getLogedInUser,
 getArticles
}
