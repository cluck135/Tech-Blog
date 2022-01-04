const router = require('express').Router();// path /api/comments/
const { Comment } = require('../../models');

router.post('/add', async (req, res) => {

    await Comment.create(req.body).then((commentData) => {
        console.log("here");
        res.status(200).json({ message: "comment created" });
    }).catch((err) => {
        res.status(400).json({ message: "comment creation failed" });
    })
});

module.exports = router;