const express = require("express");
// const app = express();

// const DELAY = 1000;
// const LIMIT = 20;

// let connections = [];

// app.get("/date", (req, res, next) => {
//   res.setHeader("Content-Type", "text/html; charset=utf-8");
//   res.setHeader("Transfer-Encoding", "chunked");
//   connections.push(res);
// });

// let tick = 0;
// setTimeout(function run() {
//   console.log(tick);
//   if (++tick > LIMIT) {
//     connections.map(res => {
//       res.write("END\n");
//       res.end();
//     });
//     connections = [];
//     tick = 0;
//   }
//   connections.map((res, i) => {
//     res.write(`Hello ${i}! Tick: ${tick}.\n`);
//   });
//   setTimeout(run, DELAY);
// }, DELAY);

// module.exports = app;

const net = require('net');
require('dotenv').config()

console.log(process.env.PORT)
console.log(process.env.INTERVAL)

const app = express();
const PORT = process.env.PORT;
const INTERVAL = process.env.INTERVAL

app.get('/', (req, res) => {
  res.send('Сервер работает')
  res.setHeader("Transfer-Encoding", "chunked")
  console.log('Сервер работает')
});

const server = net.createServer((socket) => {
  console.log('Клиент подключен');

  // Функция для отправки текущего времени
  function sendUtcTime() {
    const currentTime = new Date().toUTCString();
    console.log(`Текущее время (UTC): ${currentUtcTime}`);
    socket.write(`Текущее время: ${currentTime}\n`);

    // Отправляем время каждые 5 секунд
    setTimeout(sendTime, INTERVAL);
  }

  // Начинаем отправку времени при подключении клиента
  sendTime();

  setTimeout(() => {
    console.log('Отправка времени прекращена. Завершение ответа сервера.');
    socket.end(`Сервер завершил ответ. Текущее время (UTC): ${new Date().toUTCString()}\n`);
  }, 20000);

  // Обработчик отключения клиента
  socket.on('end', () => {
    console.log('Клиент отключен');
  });
});

// Запускаем сервер Express
app.listen(PORT, () => {
  console.log(`Express сервер запущен на порту ${PORT}`);
});

// Запускаем сервер TCP
const TCP_PORT = 12345;
server.listen(TCP_PORT, () => {
  console.log(`TCP сервер запущен на порту ${TCP_PORT}`);
});