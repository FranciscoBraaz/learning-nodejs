import passport from "passport"
import dotenv from "dotenv"
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt"
import User from "../models/User"
import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb"

dotenv.config()

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
}
const notAuthorizedJson = {
  status: 401,
  message: "Não autorizado",
}

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    const user = await User.findById(payload.id)
    console.log(user)
    if (user) {
      return done(null, user)
    }

    return done(notAuthorizedJson, false)
  }),
)

export const ensureAuth = (req: Request, res: Response, next: NextFunction) => {
  const authFunction = passport.authenticate("jwt", (err, user) => {
    if (user) {
      next()
    } else {
      next(notAuthorizedJson)
    }
  })

  authFunction(req, res, next)
}

export default passport
