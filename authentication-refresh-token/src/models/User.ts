import { Schema, model, connection, Model } from "mongoose"

type UserType = {
  email: string
  password: string
  refreshToken: string[]
}

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: [String], required: false },
})

const modelName: string = "User"
const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<UserType>)
    : model<UserType>(modelName, schema, "users")

export default userModel
