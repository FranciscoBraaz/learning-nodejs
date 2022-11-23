import { NextFunction, Request, Response } from "express"

export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    const success = true

    if (success) {
      next()
    } else {
      res.status(403).json({ error: "Não autorizado" })
    }
  },
}
