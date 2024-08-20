import express from 'express';
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv';

dotenv.config()

const TOKEN = process.env.TOKEN

const app = express();

app.get('/', (req, res) => {
  res.send(`${TOKEN}`)
})

app.listen(8443, () => {
  console.log('Server is running on port 8443');
});