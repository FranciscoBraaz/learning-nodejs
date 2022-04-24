import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import ApiRoutes from './routes/index';
import cors from 'cors';
import { mongoConnect } from './database/mongo';

dotenv.config();

mongoConnect();

const server = express();
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use('/api', ApiRoutes);
server.use((req, res) => {
  res.status(404);
  res.json({ message: 'Endpoint não encontrado' });
});

server.listen(process.env.PORT);
