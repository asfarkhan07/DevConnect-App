const express = require("express");
const router = express.Router();
const gravatar= require('gravatar');
const bcrypt= require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const  User  = require("../../models/User.js");

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user=await User.findOne({email});

      if(user){
        return res.status(400).json({errors:[{msg:"User already exists"}]});
      }
      //get users gravatar
      const avatar=gravatar.url(email,{
        s:'200',  //Size
        r:'pg',  //Rating
        d:'mm'   //Default
      });

      user=new User({
        name,
        email,
        avatar,
        password
      });

      
      //encrypt password
      const salt= await bcrypt.genSalt(10);

      user.password=await bcrypt.hash(password,salt);
      await user.save();

      //return jsonwebtoken

      const payload={
        user:{
          id:user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {expiresIn:360000},
        (err,token)=>{
          if(err) throw err;
          res.json({token});
        }
      )
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
  },
);

module.exports = router;
