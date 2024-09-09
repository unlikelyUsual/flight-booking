import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(422)
        .send({ errors: error.issues.map((error) => ({ field: error.path[1], message: error.message })) });
    }

    next(error);
  }
};
