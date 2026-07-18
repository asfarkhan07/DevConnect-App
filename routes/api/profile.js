// console.log('Profile route loaded');
const express = require("express");
const router = express.Router();
const request = require("request");
const config= require('config');


// router.post('/', (req, res) => {
//   res.json({ msg: 'POST route works' });
// });

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Posts= require("../../models/Posts");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//Router Get api/profile/me
//fetch profile details of logged in user

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name avatar"
    );
    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//Create or Update user profile-----  POST api/profile

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    }=req.body

    //Build profile object
    const profileFields={};
    profileFields.user=req.user.id; 
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    if(skills){
      profileFields.skills=skills.split(',').map(skill=>skill.trim());
    }

    //Build social object
    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;

    try{
      let profile=await Profile.findOne({user:req.user.id});

      if(profile){
        //Update
        profile=await Profile.findOneAndUpdate(
          {user:req.user.id},
          {$set:profileFields},
          { returnDocument: 'after' }
        );
        return res.json(profile);
      }
      //Create 
      profile=new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch(err){
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  },
);

//@route GET api/profiles
//@desc GET all profiles
//@access Public

router.get('/',async (req,res)=>{
  try{
    const profiles=await Profile.find().populate('user',['name','avatar']);
    res.json(profiles);

  }catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route GET api/profiles/user/:user_id
//@desc GET all profiles
//@access Public

router.get('/user/:user_id',async (req,res)=>{
  try{
    const profile=await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar']);
    if(!profile) return res.status(400).send('Profile not found');
    res.json(profile);

  }catch(err){
    console.log(err.message);
    if(err.kind=='ObjectId'){
      return res.status(400).json( {msg: 'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
})


//@route DELETE api/profile/user/:user_id
//@desc DELETE a profile,user and posts
//@access Private

router.delete('/',[auth], async (req, res) => {
  try {
    console.log('Deleting user with ID:', req.user?.id);
    //Remove Posts
    const posts= await Posts.deleteMany({ user: req.user?.id });
    console.log('Deleted posts:', posts);

    // Remove Profile
    const profile = await Profile.findOneAndDelete({ user: req.user?.id });
    console.log('Deleted profile:', profile);

    // Remove User
    const user = await User.findOneAndDelete({ _id: req.user?.id });
    console.log('Deleted user:', user);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private

router.put('/experience',[auth,[
  check('title','Title is required').not().isEmpty(),
  check('company','Company is required').not().isEmpty(),
  check('from','From date is required').not().isEmpty(),
]], async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }=req.body;

  const newExp={
    title,
    company,
    location,
    from,
    to,
    current,
    description
  }

  try{
    const profile=await Profile.findOne({user:req.user.id});
    // console.log(profile);
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
  }
)

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experiece from profile
//@access Private

router.delete('/experience/:exp_id',[auth],async (req,res)=>{
  try{
    const profile=await Profile.findOne({user:req.user.id});
    // console.log(profile.experience._id);
    //Get remove index
    const removeIndex=profile.experience.map(item=> item.id).indexOf(req.params.exp_id)
    //if(profile.experience[removeIndex]._id !== req.user.id) return res.status(400).json({msg: 'Profile not found'});
    // console.log(removeIndex);
    // console.log(profile.experience[removeIndex]);
    if(removeIndex === -1) return res.status(400).json({msg: 'Profile not found'});
    profile.experience.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
  }catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@router PUT api/profile/education
//@desc Add profile education
//@access Private
router.put('/education',[auth,[
  check('school','School is required').not().isEmpty(),
  check('degree','Degree is required').not().isEmpty(),
  check('from','From date is required').not().isEmpty(),
]], async (req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }=req.body;

  const newEdu={
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  }
  try{
    const profile=await Profile.findOne({user:req.user.id});
    // console.log(profile);
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
  }
)

//@route DELETE api/profile/education/:edu_id
//@desc Delete education from profile
//@access Private

router.delete('/education/:edu_id',[auth],async (req,res)=>{
  try{
    const profile=await Profile.findOne({user:req.user.id});
    // console.log(profile.education._id);
    //Get remove index
    const removeIndex=profile.education.map(item=> item.id).indexOf(req.params.edu_id)
    //if(profile.education[removeIndex]._id !== req.user.id) return res.status(400).json({msg: 'Profile not found'});
    // console.log(removeIndex);
    // console.log(profile.education[removeIndex]);
    if(removeIndex === -1) return res.status(400).json({msg: 'Profile not found'});
    profile.education.splice(removeIndex,1);
    await profile.save();
    res.json(profile);
  }catch(err){
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

//@route GET api/profile.github/:username
//@desc Get user repos from github
//@access Public

router.get('/github/:username', async (req,res)=>{
  try{
    const options={
      uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
      method: 'GET',
      headers: {'user-agent':'node.js'}
    }
    request(options,(error,response,body)=>{
      if(error) console.log(error);
      if(response.statusCode !== 200){
        return res.status(404).json({msg: 'No Github profile found'});
      }
      res.json(JSON.parse(body));
    })
  } catch(err){
    console.log(err);
    res.status(400).send('Server Error');
  }
})

module.exports = router;
