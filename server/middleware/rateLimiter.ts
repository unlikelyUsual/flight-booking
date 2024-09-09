import { Request, Response, NextFunction } from "express";
import { RateLimitError } from "../utils/Errors";
import redisClient from "../config/redis";

const MAX_NUMBER_OF_REQUESTS = 100;
const MAX_NUMBER_OF_REQUESTS_FOR_OTHER = 10;

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  let ttl: number;
  const user = req.user as { id: string };
  const userId = user && user.id;

  if (userId) {
    const numberOfRequestByAuthorizedUser = await redisClient.incr(userId);

    if (numberOfRequestByAuthorizedUser === 1) {
      await redisClient.expire(userId, 60);
      ttl = 60;
    } else {
      ttl = await redisClient.ttl(userId);
    }
    res.setHeader("X-Rate-Limit", ttl);
    if (numberOfRequestByAuthorizedUser >= MAX_NUMBER_OF_REQUESTS) {
      throw new RateLimitError("Too many requests! Rate Limit Exceeded!");
    } else {
      next();
    }
  } else {
    const clientIP = req.socket.remoteAddress;

    if (clientIP) {
      const numberOfRequestByNotLoggedInUser = await redisClient.incr(clientIP);

      if (numberOfRequestByNotLoggedInUser === 1) {
        await redisClient.expire(clientIP, 60);
        ttl = 60;
      } else {
        ttl = await redisClient.ttl(clientIP);
      }

      res.setHeader("X-RateLimit-TTL", ttl);
      if (numberOfRequestByNotLoggedInUser >= MAX_NUMBER_OF_REQUESTS_FOR_OTHER) {
        throw new RateLimitError("Rate Limit Exceeded! Login to use more!");
      } else {
        next();
      }
    } else {
      console.info(
        "Request made by user who isn't logged in and could not identify their IP address. Check if the request is from localhost!"
      );
    }
  }
};

export default rateLimiter;
