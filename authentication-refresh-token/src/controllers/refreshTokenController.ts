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
  const refreshToken = cookies.jwt
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })

  let user
  try {
    user = await User.findOne({ refreshToken })
    if (!user) {
      const decoded: string | Decoded = JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string,
      )

      if (typeof decoded === "object") {
        const foundUser = await User.findById(decoded.id)
        if (foundUser) {
          foundUser.refreshToken = []
          await foundUser.save()
        }
      }

      res.sendStatus(403)
      return
    }

    const newRefreshTokenArray = user.refreshToken.filter(
      (rf) => rf !== refreshToken,
    )

    const decoded: string | Decoded = JWT.verify(
      refreshToken,
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

    const newRefreshToken = JWT.sign(
      { id: user.id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "45s" },
    )

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken]
    await user.save()

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "none",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    })

    res.status(200).json({ accessToken })
  } catch (error) {
    console.log("USer", user)
    //@ts-ignore
    if (error.name === "TokenExpiredError" && user) {
      const newRefreshTokenArray = user.refreshToken.filter(
        (rf) => rf !== refreshToken,
      )

      user.refreshToken = [...newRefreshTokenArray]
      const result = await user.save()
      console.log("After check is expired", result)
    }
    res.status(401).json({ message: "Não autorizado" })
  }
}
