import {SECRET} from './keys'

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

export default (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.sub},  (err, user) => {
            
            console.log(jwt_payload,new Date().getTime());
            if (user) {
                return done(null, user);
            }
                return done(err, false);
         
        });
    }));
};