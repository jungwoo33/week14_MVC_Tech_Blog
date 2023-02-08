const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

console.log('I am in dashboard-routes.js');
// I am in: localhost:3001/dashboard
// let's show only logged-in user's post:
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes:['id','title','created_at','post_content'],
      include: [
        {
          model: Comment,
          attributes: ['id','user_id','post_id','comment_text','created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ],
    });
  
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    
    /*
    console.log("======================");
    console.log(posts);
    console.log(posts[0].id);
    console.log(posts[0].title);
    console.log(posts[0].post_content);
    */

    /* Show existing "posts" in localhost:3001 & check if a user is loggedin
      if a user is loggedIn, loggedIn will be "True".
      Then, the handlebars will show different results (in nav bar)
        ./views/dashboard.handlebars -> 
        ./views/layouts/main.handlebars
    */ 
    res.render('dashboard', {posts, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Now, let's give a user a permit to edit the post, which belongs to the logged-in user */
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id','title','created_at','post_content'],
      include: [
        {
          model: Comment,
          attributes: ['id','user_id','post_id','comment_text','created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    if(!dbPostData){
      res.status(404).json({ message: 'No post found with this id' });
      return;
    } else {
      const post = dbPostData.map((post) =>
        post.get({ plain: true })
      );

      /* 
        Now, call:
          ./views/edit-post.handlebars -> 
          ./views/layouts/main.handlebars
      */ 
      res.render('edit-post', {post,loggedIn: true});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: ['id','title','created_at','post_content'],
      include: [
        {
          model: Comment,
          attributes: ['id','user_id','post_id','comment_text','created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );
    /* 
      Now, call:
        ./views/create-post.handlebars -> 
        ./views/layouts/main.handlebars
    */ 
    res.render('create-post', {posts, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;