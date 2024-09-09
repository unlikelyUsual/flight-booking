import { Request, Response, NextFunction } from "express";

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { roles: string[] };
    if (user && user.roles.includes(role)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};
