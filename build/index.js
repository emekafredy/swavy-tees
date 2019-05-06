'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = require('express-handlebars');

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _modules = require('./server/modules');

var _modules2 = _interopRequireDefault(_modules);

var _notFound = require('./server/modules/notFound');

var _notFound2 = _interopRequireDefault(_notFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import nodemailer from 'nodemailer';
require('dotenv').config();

const app = (0, _express2.default)();

const port = process.env.PORT || 4000;

app.engine('.hbs', (0, _expressHandlebars2.default)({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_express2.default.static(`${__dirname}/public`));

(0, _modules2.default)(app);
app.use(_notFound2.default);

const server = exports.server = app.listen(port, () => _fancyLog2.default.info(`🚀 App server is running on http://localhost:${port} 🚀`));

exports.default = app;