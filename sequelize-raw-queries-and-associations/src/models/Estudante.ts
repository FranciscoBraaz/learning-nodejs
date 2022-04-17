import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/pg';
import { Usuario } from './Usuario';

export interface Estudante extends Model {
  mat_estudante: string;
  cpf: string;
  mc: number;
}

export const Estudante = sequelize.define<Estudante>(
  'Estudante',
  {
    mat_estudante: {
      primaryKey: true,
      type: DataTypes.STRING(7),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    mc: {
      type: DataTypes.FLOAT,
    },
  },
  {
    schema: 'universidade',
    tableName: 'estudante',
    timestamps: false,
  },
);

// Estudante.belongsTo(Usuario, { foreignKey: 'cpf' });
