import express from 'express';
import log from 'fancy-log';
import bodyParser from 'body-parser';
import modules from './server/modules';
import notFound from './server/modules/notFound';

require('dotenv').config();

const app = express();

const PORT = 4000 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

modules(app);
app.use(notFound);

app.listen(PORT, () => {
  log.info(`🚀 App server is running on http://localhost:${PORT} 🚀`);
});
