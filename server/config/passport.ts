import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env";

// Define JWT options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

// Define the JWT strategy
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    // Here you would find the user in your database
    // For simplicity, we are just passing the payload directly
    return done(null, jwt_payload);
  })
);

// Initialize Passport
export default passport;
