import { Request, Response, NextFunction } from "express";
import { GenericError } from "../utils/Errors";


export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

  if (res.headersSent) {
    return next();
  }

  if (error instanceof GenericError) {
    return res.status(error.statusCode).send({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? error.name : error.name
    });
  }

  return res.status(500).send({
    message: "Internal Server Error!",
    stack: process.env.NODE_ENV === "production" ? "ServerError" : error
  });
};
