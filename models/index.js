const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User =  require('./user')(sequelize, Sequelize);
db.Problem =  require('./problem')(sequelize, Sequelize);
db.Solved = require('./solved')(sequelize, Sequelize);

/*
db.User.belongsToMany(db.Problem, {
  through: 'solved',
  foreignKey: 'userID'
});


db.Problem.belongsToMany(db.User, {
  through: 'solved',
  foreignKey: 'problemID'
});

db.Solved.belongsTo(models.product, {
  foreignKey: 'product_id'
});
db.product_category.belongsTo(models.category, {
  foreignKey: 'category_id'
});
*/


module.exports = db;