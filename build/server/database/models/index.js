'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path2.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
if (_config2.default.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[_config2.default.use_env_variable], _config2.default[env]);
} else {
  sequelize = new _sequelize2.default(_config2.default[env].database, _config2.default[env].username, _config2.default[env].password, _config2.default[env]);
}

_fs2.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {
  const model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

module.exports = db;