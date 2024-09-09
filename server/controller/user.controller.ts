import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { UserRole } from "../types/enum/user.enum";
import { db } from "../db";
import { AuthError, BadRequestError } from "../utils/Errors";
import { users } from "../model/user";
import { eq } from "drizzle-orm";
import hashPassword from "../utils/HashPassword";
import { NUMBER_OF_SALT_ROUNDS } from "../config/env";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log("Getting user of email:", email);

    const [userFromDatabase] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!userFromDatabase) {
      throw new AuthError("Invalid Credentials!");
    }

    const passwordMatches = await bcrypt.compare(password, userFromDatabase.password);

    if (!passwordMatches) {
      throw new AuthError("Invalid Credentials!");
    }

    console.log("User from database:", userFromDatabase);

    const payload = { id: userFromDatabase.id, email, roles: userFromDatabase.roles || [UserRole.USER] };

    const token = sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.json({
      token: "Bearer " + token,
      message: "Signup successful. New account created!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const signupUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new BadRequestError("Mismatched Password!");
    }

    console.log("Getting user of email:", email);

    const [userFromDatabase] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (userFromDatabase) {
      throw new BadRequestError("User already exists! Login instead!");
    }

    const hashedPassword = await hashPassword(password, NUMBER_OF_SALT_ROUNDS);

    const [user] = await db.insert(users).values({ firstName, lastName, email, password: hashedPassword }).returning();

    return res.json({ message: "User successfully registered", user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log("Getting user of email:", req.user["email"]);
    const [user] = await db.select().from(users).where(eq(users.email, req.user["email"])).limit(1);

    return res.json({ user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      // handle error
    }
    res.json({ message: "Successfully logged out" });
  });
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const { id } = req.params;

    const user = await db.update(users).set({ firstName, lastName, email }).where(eq(users.id, id));

    return res.json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
