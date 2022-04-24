import { Schema, model, connection, Model } from 'mongoose';

type TaskType = {
  title: string;
  done: boolean;
};

const schema = new Schema<TaskType>({
  title: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
});

const modelName: string = 'Task';

const taskModel =
  connection && connection.models[modelName]
    ? (connection.models[modelName] as Model<TaskType>)
    : model<TaskType>(modelName, schema);

export default taskModel;
