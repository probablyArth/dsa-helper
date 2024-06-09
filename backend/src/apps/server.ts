import Express from 'express';
import logger from 'middlewares/logger.middleware';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import getEnvVar from 'env/index';
import { handleConnection, handleMessage } from 'handlers';
import { deleteConnection } from 'stores/connections';

const expressApp = Express();

const server = createServer(expressApp);
expressApp.use(cors({ origin: getEnvVar('CLIENT_ORIGIN_URL') }));

const io = new Server(server, { cors: { origin: getEnvVar('CLIENT_ORIGIN_URL') } });

expressApp.use(logger);
expressApp.use(Express.json());

expressApp.get('/health', (_, res) => {
  return res.sendStatus(200);
});

io.on('connection', (socket) => {
  handleConnection(socket);
  socket.on('message', (event) => {
    handleMessage(socket, event);
  });
});

io.on('disconnect', (socket) => {
  deleteConnection(socket.id);
});

expressApp.get('/', (_, res) => {
  return res.sendStatus(200);
});

export default server;
