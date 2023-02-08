const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
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
    console.log(posts[0].comments);
    console.log(posts[0].user);           // { username: 'Sam1' }
    console.log(posts[0].user.username);  // "Sam1"
    */

    /* Show existing "posts" in localhost:3001 & check if a user is loggedin
      if a user is loggedIn, loggedIn will be "True".
      Then, the handlebars will show different results (in nav bar)
        ./views/homepage.handlebars -> 
        ./views/layouts/main.handlebars
    */ 
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'login' template
  // ./views/login.handlebars -> 
  // ./views/layouts/main.handlebars
  res.render('login');
});

/*
// GET one gallery
router.get('/gallery/:id', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get('/painting/:id', async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });
    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
*/
module.exports = router;
