import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInstance extends Model {
  id: number;
  name: string;
  age: number;
}

export const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('name').toUpperCase();
      },
    },
    firstLetter: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('name').charAt(0);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 18,
      set(value: number) {
        if (value < 18) {
          value = 18;
        }

        this.setDataValue('age', value);
      },
    },
  },
  {
    freezeTableName: true,
    schema: 'public',
    tableName: 'user',
    timestamps: false,
  },
);
