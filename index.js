import express from 'express';
import log from 'fancy-log';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import modules from './server/modules';
import notFound from './server/modules/notFound';

require('dotenv').config();

const app = express();
const { PORT } = process.env;

const port = PORT || 4000;

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(cors({
  credentials: true,
  origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

modules(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(notFound);

export const server = app.listen(port, () => log.info(`🚀 App server is running on http://localhost:${port} 🚀`));

export default app;
