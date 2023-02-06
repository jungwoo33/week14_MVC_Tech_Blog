const { Comment } = require('../models');

const commentdata = [
   {
      user_id: 1,
      post_id: 1,
      comment_text: "Wow1"
   },
   {
      user_id: 2,
      post_id: 2,
      comment_text: "Wow2"
   },
   {
      user_id: 3,
      post_id: 3,
      comment_text: "Wow3"
   },
]
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;