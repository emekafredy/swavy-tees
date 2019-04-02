import express from 'express';

require('dotenv').config();

// create our express app
const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
});
