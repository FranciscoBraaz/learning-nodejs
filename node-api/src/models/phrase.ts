import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface PhraseInstance extends Model {
  id: number;
  author: string;
  text: string;
}

export const Phrase = sequelize.define<PhraseInstance>(
  'Phrase',
  {
    id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'phrase', schema: 'phrases', timestamps: false },
);
