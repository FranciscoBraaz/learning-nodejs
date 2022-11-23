import { Request, Response } from "express"
import User from "../models/User"

export async function list(req: Request, res: Response) {
  const users = await User.find()

  res.json({ users: users }).status(200)
}
