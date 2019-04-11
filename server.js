import express from 'express';
import modules from './server/modules';
import notFound from './server/modules/notFound';

require('dotenv').config();

// create our express app
const app = express();

const PORT = 4000 || process.env.PORT;

modules(app);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`)
});
