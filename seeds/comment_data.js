const { Comment } = require('../models');

/*
mysql> select * from comment;
+----+---------+---------+--------------+---------------------+---------------------+
| id | user_id | post_id | comment_text | created_at          | updated_at          |
+----+---------+---------+--------------+---------------------+---------------------+
|  1 |       1 |       1 | Wow1         | 2023-02-06 21:51:30 | 2023-02-06 21:51:30 |
|  2 |       2 |       2 | Wow2         | 2023-02-06 21:51:30 | 2023-02-06 21:51:30 |
|  3 |       3 |       3 | Wow3         | 2023-02-06 21:51:30 | 2023-02-06 21:51:30 |
+----+---------+---------+--------------+---------------------+---------------------+
*/
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