const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/* I am in: localhost:3001/dashboard
  let's show only logged-in user's post:
  Here, 'withAuth' will do the following:
    if a user is already logged-in, go to the next step, i.e., the 'async (req, res) => { ...}
    if a user is not logged-in, redirect to the 'localhost:3003/login' route, i.e.,:
      res.redirect('/login'); // this will call:
        /views/login.handlebars 
      & the login.handlebars will create httml and call:
        public/js/login.js
        then, it will call:
          controllers/api/user-routes.js
          then, find the post route: 
            "router.post('/login', async (req, res) => {"
          then, this part will check if given email & password is correct, if they are correct:
          it will set up sessions with the 'loggedIn' variable:
            req.session.save(() => {
              req.session.user_id = dbUserData.id;
              req.session.username = dbUserData.username;
              req.session.loggedIn = true;
            Now, we have logged-in user's:
              user_id, username, and loggedIn(=true)
  Now, 'async (req,res) => { }' part will be performed, i.e.,:
  localhost:3001/dashboard with "get" route will be performed
*/
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
    
    console.log("================================================");
    console.log("================================================");
    console.log("================================================");
    console.log("================================================");
    console.log("================================================");
    console.log(posts);
    /*
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
      // I don't understand why this does not work... 
      // probably, dpPostData is not an array...
      /*
      const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );
      */
      const post = dbPostData.get({ plain: true });

      //console.log('!=================================================!');
      //console.log(post);

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