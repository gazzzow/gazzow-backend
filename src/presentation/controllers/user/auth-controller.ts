import type { Request, Response } from "express";

import { UserRepository } from "../../../infrastructure/repositories/user-repository.js";
import { RegisterUser } from "../../../application/use-cases/user/register-user.js";
import { PasswordHasher } from "../../../infrastructure/providers/password-hasher.js";


const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher(); // Pass salt rounds(optional)
const registerUser = new RegisterUser(userRepository, passwordHasher);


export const register = async (req: Request, res: Response) => {

  console.log("User Register API hit");

  try {
    const user = await registerUser.execute(req.body);
    res.status(201).json({ message: "User register successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'User register failed!'})
  }
};
