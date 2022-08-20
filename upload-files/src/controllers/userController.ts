import { Request, Response } from "express"
import User from "../models/User"

export const createUser = async (req: Request, res: Response) => {
  const data = req.body
  let newUser = new User()

  console.log()

  res.redirect("/")
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({})
  console.log(users)
  res.json({ users })
}

export const incrementAge = async (req: Request, res: Response) => {
  const { id } = req.params
  let user = await User.findById(id)
  if (user) {
    user.age++
    await user.save()
  }

  res.redirect("/")
}
