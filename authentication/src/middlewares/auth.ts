import { NextFunction, Request, Response } from "express"
import User from "../models/User"

export const Auth = {
  private: async (req: Request, res: Response, next: NextFunction) => {
    let success = false

    if (req.headers.authorization) {
      const hash = req.headers.authorization.substring(6)
      const decoded = Buffer.from(hash, "base64").toString()
      const data = decoded.split(":")
      if (data.length === 2) {
        const [email, password] = data
        const user = await User.findOne({ email })
        if (user?.password === password) {
          success = true
        }
      }
    }

    if (success) {
      next()
    } else {
      res.status(403).json({ error: "Não autorizado" })
    }
  },
}
