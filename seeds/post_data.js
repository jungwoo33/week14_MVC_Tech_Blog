const { Post } = require('../models');

const postdata = [
   {
      title: "Sam1",
      post_content: "Sam1_content",
      user_id: 1
  },
  {
      title: "Sam2",
      post_content: "Sam2_content",
      user_id: 1
  },
  {
      title: "Sam3",
      post_content: "Sam3_content",
      user_id: 2
  }
]
const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
