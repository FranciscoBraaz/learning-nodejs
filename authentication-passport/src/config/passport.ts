import passport from "passport"
import { BasicStrategy } from "passport-http"
import User from "../models/User"

const notAuthorizedJson = {
  status: 401,
  message: "Não autorizado",
}

passport.use(
  new BasicStrategy(async (email, password, done) => {
    if (email && password) {
      const user = await User.findOne({ email, password })

      if (user) {
        return done(null, user)
      }
    }

    return done(notAuthorizedJson, false)
  }),
)

export default passport