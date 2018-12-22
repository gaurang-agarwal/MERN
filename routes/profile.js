import Profile from "../models/Profile";
import passport from "passport";

const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "test profile" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ message: "No Profile" });
        }
        return res.json(profile);
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ message: "Error in profile" });
      });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle ? req.body.handle : '';
    profileFields.company = req.body.company ? req.body.company : '';
    profileFields.website = req.body.website ? req.body.website : '';
    profileFields.location = req.body.location ? req.body.location : '';
    profileFields.bio = req.body.bio ? req.body.bio : '';
    profileFields.status = req.body.status ? req.body.status : '';
    profileFields.githubusername = req.body.githubusername ? req.body.githubusername: '';
    profileFields.skills = req.body.skills ? req.body.skills.split(",") : '';
    profileFields.social = {};
    profileFields.social.youtube = req.body.youtube ? req.body.youtube : '';
    profileFields.social.instagram = req.body.instagram? req.body.instagram: '';
    profileFields.social.linkedin = req.body.linkedin ? req.body.linkedin: '';
    profileFields.social.facebook = req.body.facebook ? req.body.facebook: '';

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          new Profile(profileFields).save().then(profile => res.json(profile));
        }
      })
      .catch(err => console.log(err));
  }
);

export default router;
