import { Request, Response } from "express"
import JWT, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"

dotenv.config()

interface RequestExtended extends Request {
  id?: string
}

interface Decoded extends JwtPayload {
  id?: string
}

export async function handleRefreshToken(req: RequestExtended, res: Response) {
  const { cookies } = req

  if (!cookies?.jwt) {
    res.status(401).json({ message: "Não autorizado" })
    return
  }
  console.log("COOKIES", cookies)
  const refreshToken = cookies.jwt
  const user = await User.findOne({ refreshToken })
  console.log("USER", user)

  if (!user) {
    res.status(401).json({ message: "Não autorizado" })
    return
  }

  try {
    const decoded: string | Decoded = JWT.verify(
      user.refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    )

    if (typeof decoded === "object") {
      req.id = decoded.id
    }

    const accessToken = JWT.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30s" },
    )

    res.status(200).json({ accessToken })
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: "Não autorizado" })
  }
}
