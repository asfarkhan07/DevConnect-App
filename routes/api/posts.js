const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// router.put('/test', async (req,res)=>{
//   console.log('Its woorking')
//   res.send('Its working')
// })

//@router /api/posts
//@desc add posts
//@ private

router.post(
  "/",
  [auth],
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Posts({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      //   console.log(post)
      res.json(post);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send("Server Error");
    }
  },
);

//@router api/posts
//@desc get all posts
//@private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

//@router api/posts/:post_id
//@desc Get post by ID
//@private

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.post_id);

    if (!post) return res.status(400).send("Post not found");

    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind == ObjectId) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    res.status(400).send("Server Error");
  }
});

//@router api/posts/:post_id
//@desc Delete post
//@private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.post_id);
    if (!post) return res.status(400).send("Post not found");

    //Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Found" });
    }
    await post.deleteOne();
    res.json({msg:'Post Removed'});
  } catch (err) {
    console.log(err.message);
    if(err.kind === 'ObjectId'){
        return res.status(404).json({msg:'Post not found'});
    }
  }
});

//@router PUT /api/profile/like/:id
//@desc like a post
//@private
router.put('/like/:id', auth , async (req,res)=>{
    try {
        const post= await Posts.findById(req.params.id);

        //Check if the post has already been Liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
            return res.json({msg : 'Post already liked'})
        }

        post.likes.unshift({ user:req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

//@router PUT /api/profile/unlike/:id
//@desc unlike a post
//@private
router.put('/unlike/:id', auth , async (req,res)=>{
    // console.log('Unlike route hit with it');
    try {
        const post= await Posts.findById(req.params.id);

        if(!post) {
          return res.status(400).json({msg: 'Post not found'})
        }

        //Check if the post has already been Liked
        if(post.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({msg : 'Post is not Liked'})
        }

        //Get remove Index
        const removeIndex=post.likes.map(like=> like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

//@route POST api/posts/comment/:id
//@desc Post Comments on a post
//@private

router.post('/comment/:id', 
  [ 
    auth, 
    [
      check('text','Text is required').not().isEmpty()
    ]
  ],
  async (req,res)=>{
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }

  try {
    const user= await User.findById(req.user.id).select('-password');
    const post= await Posts.findById(req.params.id);

    const newComment={
      text:req.body.text,
      name:user.name,
      avatar:user.avatar,
      user:req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments)
    
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Server Error');
    
  }
}
)

//@route DELETE api/posts/comment/:id
//@desc delete Comments on a post
//@private

router.delete('/comment/:id/:comment_id', 
  [ 
    auth
  ],
  async (req,res)=>{
  try {
    const post=await Posts.findById(req.params.id);

    //Pull out comment
    const comment=await post.comments.find(comment=> comment.id === req.params.comment_id)

    //Make sure comments exists
    if(!comment){
      return res.status(404).json({msg:'Comment doesnt exist'})
    }

    //Check User
    if(comment.user.toString() !== req.user.id){
      return res.status(404).json({msg: 'User not authorized'});
    }
  //get remove Index
  const removeIndex= post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
  if(removeIndex === '-1'){
    return res.status(404).json({msg: 'Comment doesnt exist'})
  }
  await post.comments.splice(removeIndex,1);

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message)
    res.status(400).send('Server Error');
    
  }
}
)

module.exports = router;
