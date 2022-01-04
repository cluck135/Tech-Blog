const router = require('express').Router();// path /api/comments/
const { Comment } = require('../../models');

router.post('/add', async (req, res) => {
    const commentData = req.body
    commentData.user_id = req.session.user_id;
    await Comment.create(commentData).then((data) => {
        console.log("here");
        res.status(200).json({ message: "comment created" });
    }).catch((err) => {
        res.status(400).json({ message: "comment creation failed" });
    })
});

module.exports = router;