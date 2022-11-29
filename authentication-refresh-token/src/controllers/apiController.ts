import { Request, Response } from "express"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()

interface RequestExtended extends Request {
  id?: string
}

export async function login(req: Request, res: Response) {
  const { cookies } = req
  console.log("Cookies:", cookies)
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

  const accessToken = JWT.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "30s" },
  )

  const newRefreshToken = JWT.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "45s" },
  )

  const newRefreshTokenArray = !cookies.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt)

  if (cookies?.jwt) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
  }

  user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
  await user.save()

  const userToReturn = {
    _id: user._id,
    email: user.email,
  }

  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    sameSite: "none",
    // secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  })

  res.json({ user: userToReturn, accessToken })
}

export async function list(req: RequestExtended, res: Response) {
  console.log("ID User:", req.id)
  const users = await User.find()

  res.json({ users: users }).status(200)
}
