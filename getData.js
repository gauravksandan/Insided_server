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

const getCategoriesList = async (req, res) => {
  const access_token = await accessToken();
  try {
    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/v2/categories`, {
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

const getArticlesv2 = async (req, res) => {
  const access_token = await accessToken();
  try {
    let headers = {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };
    
    // Fetch data from API using the access token
    const articles = axios.get(`${process.env.BASE_URL}/v2/articles?&pageSize=100`, headers);
    const conversations = axios.get(`${process.env.BASE_URL}/v2/conversations?&pageSize=100`, headers);
    const questions = axios.get(`${process.env.BASE_URL}/v2/questions?&pageSize=100`, headers);

    // Wait for all promises to settle
    const results = await Promise.allSettled([articles, conversations, questions]);

    // Structure the results and handle errors
    const responseData = {
      articles: results[0].status === 'fulfilled' ? results[0].value.data : null,
      conversations: results[1].status === 'fulfilled' ? results[1].value.data : null,
      questions: results[2].status === 'fulfilled' ? results[2].value.data : null,
    };

    // Send the response as JSON
    res.json(responseData);

  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Authentication failed', 
      details: error.response ? error.response.data : error.message 
    });
  }
};


// new code for badges awards

const giveBadge = async (req, res) => {
  const userId = req.params.userId;
  const badgeId = req.params.badgeId;
  const access_token = await accessToken(); 
  let config = {
    method: 'PUT',
    url: `https://api2-eu-west-1.insided.com/user/${userId}/badge/${badgeId}`,
    headers: { 
      'Authorization': `Bearer ${access_token}`
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log("asfds", );
    res.send(response.data);
    console.log("Response Data: ", JSON.stringify(response.data));
  })
  .catch((error) => {
    console.error("Error fetching data: ", error.message);
    res.status(500).send({ error: "Failed to fetch data." });
  });
};


const getUserBadges = async (req, res) => {
  try {
    const access_token = await accessToken();
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch user data
    const userResponse = await axios.get(`${process.env.BASE_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const userData = userResponse.data;

    // Fetch community badges
    const badgeResponse = await axios.get(`${process.env.BASE_URL}/gamification/badges`, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const badgeList = badgeResponse.data;

    // Merge badge images into user badges
    if (
      userData &&
      userData._related &&
      Array.isArray(userData._related.badges) &&
      badgeList?.results?.length
    ) {
      const badgeMap = new Map();

      badgeList.results.forEach(badge => {
        badgeMap.set(String(badge.id), badge.image);
      });

      userData._related.badges = userData._related.badges.map(userBadge => {
        const badgeId = String(userBadge.id);
        return {
          ...userBadge,
          image: badgeMap.get(badgeId) || null
        };
      });
    }

    res.json(userData);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({
      error: 'Failed to get user with badge images',
      details: error.response ? error.response.data : error.message
    });
  }
};


const getTopics = async (req, res) => {
  const access_token = await accessToken();
  try {
    // Fetch data from API using the access token
    const apiResponse = await axios.get(`${process.env.BASE_URL}/v2/topics?page=1&pageSize=200`, {
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



module.exports = {
 getUsers,
 getLeaderboardsByPoints,
 getLeaderboardsperiod,
 getLogedInUser,
 getArticles,
 getCategoriesList,
 getArticlesv2,
 giveBadge,
 getUserBadges,
 getTopics
}
