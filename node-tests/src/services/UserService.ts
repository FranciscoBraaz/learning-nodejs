import bcrypt from "bcrypt"
import User from "../models/User"

export async function createUser(email: string, password: string) {
  const user = await User.findOne({ email })

  if (user) {
    throw new Error("E-mail já cadastrado")
  }

  const hash = bcrypt.hashSync(password, 10)
  const newUser = await User.create({ email, password: hash })
  return newUser
}

export async function findByEmail(email: string) {
  const user = await User.findOne({ email })

  return user
}

export function matchPassword(passwordText: string, encryptedPassword: string) {
  return bcrypt.compareSync(passwordText, encryptedPassword)
}

export async function getAllUsers() {
  return await User.find()
}
