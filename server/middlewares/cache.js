import redis from 'redis';

require('dotenv').config();

const client = redis.createClient();

// eslint-disable-next-line import/prefer-default-export
export const cacheMiddleware = (req, res, next) => {
  const key = `__expIress__ ${req.originalUrl}` || req.url;
  client.get(key, (err, reply) => {
    res.set({
      'Content-Type': 'application/json'
    });
    if (reply) {
      res.send(JSON.parse(reply));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};
