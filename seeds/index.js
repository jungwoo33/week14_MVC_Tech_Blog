const sequelize = require('../config/connection');
const seedPosts = require('./post_data');
const seedUsers = require('./user_data');
const seedComments = require('./comment_data');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedAll();
