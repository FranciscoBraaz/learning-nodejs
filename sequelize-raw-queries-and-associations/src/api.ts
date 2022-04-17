import { Router } from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from './instances/pg';
import { Estudante } from './models/Estudante';
import { Usuario } from './models/Usuario';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Bem vindo!' });
});

router.get('/consulta', async (req, res) => {
  const students = await sequelize.query(
    `SELECT * 
      FROM universidade.estudante`,
    { type: QueryTypes.SELECT, model: Estudante, mapToModel: true },
  );

  res.json({ students });
});

export default router;
