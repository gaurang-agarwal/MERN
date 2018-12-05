import Profile from '../models/Profile';
import passport from 'passport';

const express = require('express');

const router= express.Router();


router.get("/test", (req,res)=> res.json({"msg":"test profile"}));


router.post("/", passport.authenticate('jwt',{session:false}), (req, res) => {
     Profile.findOne({user: req.user.id})
     .then(profile =>{
         if(!profile){
           return  res.status(404).json({message:"No Profile"});
         }
         return res.json(profile);
     }).catch(err => {
         console.log(err);
        return  res.status(404).json({message:"Error in profile"});
     });
    
    });

export default router;