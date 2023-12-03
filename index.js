const express = require("express");
const app = express();
require('dotenv').config()

PORT = process.env.PORT
INTERVAL = process.env.INTERVAL

app.get('/', (req, res) => {
  if (req.method === 'GET') {
    const interval = setInterval(() => {
      console.log(new Date());
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      res.send('интервал остановлен');
    }, INTERVAL);
  }
});

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});