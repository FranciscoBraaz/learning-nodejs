import { Request, Response } from "express"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.json({ message: "Dados incompletos" }).status(400)
    return
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.json({ message: "Email ou senha incorretos" }).status(400)
    return
  }

  if (user.password !== password) {
    res.json({ message: "Email ou senha incorretos" }).status(400)
    return
  }

  const token = JWT.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "2h" },
  )

  res.json({ user: user, token })
}

export async function list(req: Request, res: Response) {
  const users = await User.find()

  res.json({ users: users }).status(200)
}
