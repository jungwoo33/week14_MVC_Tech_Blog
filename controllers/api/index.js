const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes); // Now, we are in /api/users
router.use('/posts', postRoutes); // Now, we are in /api/posts
router.use('/comments', commentRoutes); // Now, we are in /api/comments

module.exports = router;
