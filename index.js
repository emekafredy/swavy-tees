import express from 'express';
import log from 'fancy-log';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import cors from 'cors';
import session from 'express-session';
import connectSession from 'connect-session-sequelize';

import modules from './server/modules';
import notFound from './server/modules/notFound';
// eslint-disable-next-line import/named
import { sequelize } from './server/database/models';

require('dotenv').config();

const SequelizeStore = connectSession(session.Store);

const app = express();
const {
  NODE_ENV, PORT, SESSION_NAME, SESSION_SECRET
} = process.env;
const oneWeek = 1000 * 60 * 60 * 24 * 7;
const port = PORT || 4000;

const inProduction = NODE_ENV === 'production';
const myStore = new SequelizeStore({
  db: sequelize,
  expiration: oneWeek
});

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

const sessionConfig = {
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  proxy: true,
  store: myStore,
  cookie: {
    maxAge: oneWeek,
    secure: inProduction
  }
};

app.use(cors({
  credentials: true,
  origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));
app.use(session(sessionConfig));
myStore.sync();

modules(app);
app.use(notFound);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export const server = app.listen(port, () => log.info(`🚀 App server is running on http://localhost:${port} 🚀`));

export default app;
