const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

app.get('/token', async (req, res) => {
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

    const { access_token } = response.data;

    // Fetch data from API using the access token
    const apiResponse = await axios.get(process.env.API_URL, {
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
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
