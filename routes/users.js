import User from "../models/User";
import { SECRET } from "../config/keys";
import { validateRegistrationInput } from "../validations/registration";

const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 const passport = require('passport');

router.get("/test", (req, res) => res.json({ msg: "test users" }));

router.post("/register", (req, res) => {

  const {errors,isValid} = validateRegistrationInput(req.body);
  if(!isValid){
    return res.status(400).json({errors})
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user)
        return res.status(400).json({ message: "Email Already Exists" });

      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
        protocol: "http"
      });

      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(newUser))
            .catch(err => res.status(400));
        });
      });
    })
    .catch(error => console.log(error));
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) return res.status(404).json({ msg: "Email ID doesnot exists" });
    console.log(user.email, user.password);

    const password = user.password;
    bcrypt.compare(req.body.password, password).then(isMatched => {
      if (isMatched) {
        const payLoad = { id: user.id, name: user.name, email: user.email };
        jwt.sign(
            payLoad, 
            SECRET, 
            { expiresIn: 3600 }, 
            (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });

        return;
      }
      res.status(400).json({ msg: "Invalid Password" });
    });
  });
});

router.post("/current", passport.authenticate('jwt',{session:false}), (req, res) => {
res.json(req.user);

});

export default router;
