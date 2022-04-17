import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './api';
import cors from 'cors';

dotenv.config();

const server = express();
server.use(cors());

server.use(express.urlencoded({ extended: true }));
server.use('/api', apiRoutes);

server.listen(process.env.PORT);
