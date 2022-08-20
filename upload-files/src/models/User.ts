import { Schema, model, connection, Model } from "mongoose"

type UserType = {
  age: number
  interests: [string]
  name: string
}

const schema = new Schema<UserType>({
  age: { type: Number, required: true },
  interests: [String],
  name: { type: String, required: true },
})

const modelName: string = "User"
const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<UserType>)
    : model<UserType>(modelName, schema, "users")

export default userModel
