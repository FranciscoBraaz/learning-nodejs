import { Request, Response } from "express"
import User from "../models/User"

export async function handleLogout(req: Request, res: Response) {
  const { cookies } = req

  if (!cookies?.jwt) {
    res.sendStatus(204)
    return
  }

  const refreshToken = cookies.jwt

  try {
    const user = await User.findOne({ refreshToken })

    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      res.sendStatus(204)
      return
    }

    user.refreshToken = user.refreshToken.filter((rf) => rf !== refreshToken)

    await user.save()
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erro ao fazer logout" })
  }
}
