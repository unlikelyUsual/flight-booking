import { createClient } from "redis";
import { REDIS_HOST, REDIS_PORT, REDIS_URL } from "./env";

const reconn_strategy = (retries: number): number | Error => {
  if (retries > 10) {
    console.error("Too many retries to connect to Redis. Connection closed!");
    return new Error("Too many retries! Could not connect to Redis!");
  } else {
    const wait = Math.min(2000 * Math.pow(2, retries), 10000);
    console.log("waiting", wait, "milliseconds");
    return wait;
  }
};

const redisClient =
  REDIS_URL || process.env.NODE_ENV === "production"
    ? createClient({ url: REDIS_URL })
    : createClient({
        socket: {
          host: REDIS_HOST,
          port: parseInt(REDIS_PORT) || 6379,
          reconnectStrategy: reconn_strategy,
        },
      });

redisClient.on("connect", () => {
  console.log("Connected to Redis!");
});

export default redisClient;
