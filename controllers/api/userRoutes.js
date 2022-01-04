const router = require('express').Router();// path /api/users/
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

 router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const postData = await Post.findAll();
    const commentData = await Comment.findAll();

    const posts = postData.map((project) => project.get({ plain: true }));
    const comments = commentData.map((project) => project.get({ plain: true }));
    const users = userData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {
      users,
      posts,
      comments,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });    
  } catch (err) {
    res.status(500).json(err);
  }
 });

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { name: req.body.user } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.signed_up = true;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/add', async (req, res) => {
    // Find the user who matches the posted e-mail address
    await User.create(req.body).then((userData) => {
      const user = userData.get({ plain: true });

      console.log("here" + user);////Try to figure out why on first signup multiple accounts are created instead of one, maybe a bug
      req.session.save(() => {
        req.session.signed_up = true;
        req.session.user_id = user.id;
        req.session.logged_in = true;
      res.json({ user: user, message: 'You are now signed up!' });
    })
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    })

});


router.post('/logout', (req, res) => {

  const signed_up = req.session.signed_up;
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
  // req.session.save(() => {
  //   req.session.signed_up = true;
  // res.json({ user: user, message: 'You are now signed up!' });
});

module.exports = router;
