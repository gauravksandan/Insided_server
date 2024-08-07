const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require("./routers");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
