const router = require('express').Router();
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{model: Post, as: "posts"}]
    });
    const users = userData.map((item) => item.get({ plain: true }));
    res.render('homepage', {
      users,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogPost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [{ all: true, nested: true }],
      //attributes: { exclude: ['password']} //this doesnt work figure out how to filter out the password
    });      
    const post = postData.get({ plain: true });
      res.render('blogpost', {
        post,
        logged_in: req.session.logged_in
      });
      res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogPost/:id/comment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: { id: req.params.id },
      include: [{ all: true, nested: true }],
      //attributes: { exclude: ['password']} //this doesnt work figure out how to filter out the password
    });      
    const comment = commentData.get({ plain: true });
      res.render('comment', {
        comment,
        logged_in: req.session.logged_in
      });
      res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ all: true, nested: true }],
      //attributes: { exclude: ['password']} //this doesnt work figure out how to filter out the password
    });      
    const posts = postData.map((item) => item.get({ plain: true }));
      res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in
      });
      res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newPost', withAuth, async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('newpost', {
    user_id: req.session.user_id
  });
})

router.get('/updatePost/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [{ all: true, nested: true }],
      //attributes: { exclude: ['password']} //this doesnt work figure out how to filter out the password
    });      
    const post = postData.get({ plain: true });
      res.render('editpost', {
        post,
        logged_in: req.session.logged_in
      });
      res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
