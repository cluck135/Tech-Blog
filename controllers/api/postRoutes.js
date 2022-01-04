const router = require('express').Router();// path /api/posts/
const { Post } = require('../../models');

router.post('/add', async (req, res) => {

    await Post.create(req.body).then((postData) => {
        console.log("here");
        res.status(200).json({ message: "post created" });
    }).catch((err) => {
        res.status(400).json({ message: "post creation failed" });
    })

})

router.put('/updatePost', async (req, res) => {

await Post.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {   
      where: { id: req.body.post_id },
    }
    ).then((postData) => {
      res.status(200).json({ message: "post updated" });
    }).catch((err) => {
      console.log(err)
      res.status(400).json({ message: "post update failed" });
    })
    
})

router.delete('/deletePost', async (req, res) => {

  await Post.destroy({
    where: {id: req.body.post_id}
  }).then((postData) => {
      console.log("here");
      res.status(200).json({ message: "post deleted" });
  }).catch((err) => {
      res.status(400).json({ message: "post delete failed" });
  })

})

module.exports = router;