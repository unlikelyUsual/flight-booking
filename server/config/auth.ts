import { Request, Response, NextFunction } from "express";
import passport from "../config/passport";

// Middleware to check if the user is authenticated
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
