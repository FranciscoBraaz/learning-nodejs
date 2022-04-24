import { Schema, model, connection, Model } from 'mongoose';

type UserType = {
  email: string;
  age: number;
  interests: [string];
  name: {
    first_name: string;
    last_name: string;
  };
};

const schema = new Schema<UserType>({
  email: { type: String, required: true },
  age: { type: Number, required: true },
  interests: [String],
  name: {
    first_name: { type: String, required: true },
    last_name: String,
  },
});

const modelName: string = 'User';
const userModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<UserType>)
    : model<UserType>(modelName, schema, 'users');

export default userModel;