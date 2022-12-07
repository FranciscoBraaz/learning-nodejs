import { Schema, model, connection, Model } from "mongoose"

export type UserType = {
  email: string
  password: string
}

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const modelName: string = "User"
const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<UserType>)
    : model<UserType>(modelName, schema, "users")

export default userModel
