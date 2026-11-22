import net from 'node:net';

const HOST = '127.0.0.1';
const PORT = 3000;
const MESSAGE = 'EVENT: PC-07 REQUEST_HELP';

const socket = net.createConnection({ host: HOST, port: PORT });

socket.setEncoding('utf8');

socket.on('connect', () => {
  console.log('Соединение с NetLab установлено');
  socket.write(`${MESSAGE}\n`);
});

socket.on('data', (chunk) => {
  console.log('Ответ сервера: ' + chunk.trim());
  socket.end();
});

socket.on('error', (error) => {
  console.error('Не удалось подключиться к серверу: ' + error.message);
});

socket.on('close', () => {
  console.log('Соединение закрыто');
});
