import net from 'node:net';

const HOST = '127.0.0.1';
const PORT = 3000;
let connectionCount = 0;

const server = net.createServer((socket) => {
  connectionCount++;
  console.log(`Подключений с момента старта: ${connectionCount}`);

  const now = new Date();
  const timeStr = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  socket.setEncoding('utf8');

  socket.on('data', (chunk) => {
    const message = chunk.trim();
    console.log(`[${timeStr}] ${message}`);
    socket.write(`ACK: ${message}\n`);
  });

  socket.on('end', () => {
    console.log('Клиент завершил соединение');
  });

  socket.on('error', (error) => {
    console.error('Ошибка клиента: ' + error.message);
  });
});

server.on('error', (error) => {
  console.error('Ошибка сервера: ' + error.message);
});

server.listen(PORT, HOST, () => {
  console.log('NetLab v1.0 — сервер запущен');
});
