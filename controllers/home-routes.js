const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// I am in: 
//    localhost:3001/
// use the ID from the session
// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes:['id','title','created_at','post_content'],
      order: [['created_at','DESC']], // I will show the recent post first.
      /*limit: 10,*/
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
    res.render('homepage', {posts, loggedIn: req.session.loggedIn,});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// router.get('/', (req, res) => {
//   Post.findAll({
//       attributes:['id','title','created_at','post_content'],
//       order: [['created_at','DESC']], // I will show the recent post first.
//       /*limit: 10,*/
//       include: [
//         {
//           model: Comment,
//           attributes: ['id','user_id','post_id','comment_text','created_at'],
//           include: {
//             model: User,
//             attributes: ['username']
//           }
//         },
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ],
//   }).then(dbPostData => {

//     const posts = dbPostData.map(post =>
//       post.get({ plain: true })
//     );
//      console.log("======================");
//      console.log(posts);
// //     console.log(posts[0].id);
// //     console.log(posts[0].title);
// //     console.log(posts[0].post_content);
// //     console.log(posts[0].comments);
// //     console.log(posts[0].user);           // { username: 'Sam1' }
// //     console.log(posts[0].user.username);  // "Sam1"


//     res.render('homepage', {posts, loggedIn: req.session.loggedIn,});
//   }).catch (err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });


router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {id: req.params.id},
    attributes: ['id','title','created_at','post_content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    // serialize the data
    const post = dbPostData.get({ plain: true });

    // pass data to template
    res.render('single-post', {post, loggedIn: req.session.loggedIn});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Login & Signup route
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

// Signup route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'signup' template
  // ./views/signup.handlebars -> 
  // ./views/layouts/main.handlebars
  res.render('signup');
});

module.exports = router;
