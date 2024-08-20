import express from 'express';
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv';

dotenv.config()

const TOKEN = process.env.TOKEN

const TAG = '@waifu_mz_bot'

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Запустить бота" },
  { command: "/info", description: "Информация о боте" },
  { command: "/hello", description: "Сказать Привет" },
]);

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const chatTitle = msg.chat.title;
  const text = msg.text;
  const nameOfUser = msg.from.first_name;

  // bot.sendMessage(chatId, 'Your message is ' + text);
  switch (text) {
    case "/start":
      await bot.sendMessage(chatId, `Привет ` + nameOfUser + "!");
      break;
    case "/start@waifu_mz_bot":
      await bot.sendMessage(chatId, `Привет ` + chatTitle + "!");
      break;
    default:
      await bot.sendMessage(chatId, "Ножан красавчик похуй");
  }
});


const app = express();

app.get('/', (req, res) => {
  res.send(`${TOKEN}`)
})

app.listen(8443, () => {
  console.log('Server is running on port 8443');
});