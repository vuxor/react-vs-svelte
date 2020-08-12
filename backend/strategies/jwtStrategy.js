const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const jwtStrategy = new JwtStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, function(payload, done) {
    User.findById(payload.id, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "No user found" });
        return done(null, user);
    })
})

module.exports = jwtStrategy;