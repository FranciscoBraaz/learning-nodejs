import { NextFunction, Request, Response } from "express"
import JWT, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"
import { decode } from "punycode"

dotenv.config()

interface RequestExtended extends Request {
  id?: string
}

interface Decoded extends JwtPayload {
  id?: string
}

export const Auth = {
  private: async (req: RequestExtended, res: Response, next: NextFunction) => {
    let success = false

    if (req.headers.authorization) {
      const [authType, token] = req.headers.authorization.split(" ")
      if (authType === "Bearer") {
        try {
          const decoded: string | Decoded = JWT.verify(
            token,
            process.env.JWT_SECRET_KEY as string,
          )
          if (typeof decoded === "object") {
            req.id = decoded.id
          }
          success = true
        } catch (error) {
          console.log(error)
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
