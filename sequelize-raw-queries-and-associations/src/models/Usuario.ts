import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UsuarioInterface extends Model {
  mat_estudante: string;
  cpf: string;
  primeiro_nome: string;
  sobrenome: string;
  data_nascimento: Date;
  email: string[];
  telefone: string[];
}

export const Usuario = sequelize.define<UsuarioInterface>(
  'Usuario',
  {
    cpf: {
      primaryKey: true,
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    primeiro_nome: {
      type: DataTypes.STRING,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    data_nascimento: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    telefone: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    schema: 'universidade',
    tableName: 'usuario',
    timestamps: false,
  },
);
