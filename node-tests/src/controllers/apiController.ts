import { Request, Response } from "express"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import * as UserService from "../services/UserService"

dotenv.config()

interface RequestExtended extends Request {
  id?: string
}

export async function register(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Dados incompeltos" })
    return
  }

  try {
    const newUser = await UserService.createUser(email, password)

    res.status(201).json({ user: newUser })
  } catch (error) {
    console.log("E", error)

    //@ts-ignore
    res.status(400).json({ message: error.message })
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Dados incompletos" })
    return
  }

  const userFounded = await UserService.findByEmail(email)

  if (!userFounded) {
    res.status(401).json({ message: "Email ou senha incorretos" })
    return
  }

  if (!UserService.matchPassword(password, userFounded.password)) {
    res.status(401).json({ message: "Email ou senha incorretos" })
    return
  }

  const token = JWT.sign(
    { id: userFounded._id, email: userFounded.email },
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "2h" },
  )

  const userToReturn = {
    _id: userFounded._id,
    email: userFounded.email,
  }

  res.json({ user: userToReturn, token })
}

export async function list(req: RequestExtended, res: Response) {
  console.log("ID User:", req.id)
  const users = await UserService.getAllUsers()

  res.json({ users: users })
}
