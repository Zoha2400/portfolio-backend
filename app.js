import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Убедитесь, что у вас установлен пакет node-fetch

dotenv.config();

const TOKEN = process.env.TOKEN;
const TAG = '@waifu_mz_bot';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Запустить бота" },
  { command: "/info", description: "Информация о боте" },
  { command: "/bonus", description: "Сказать Привет" },
  { command: "/trade", description: "Информация о боте" },
  { command: "/store", description: "Сказать Привет" },
  { command: "/waifu", description: "Рандомная тянка" },

]);

// Функция для выполнения запроса к API
const fetchWaifuImages = async () => {
  const apiUrl = 'https://i.waifu.pics/Tj6Wzwo.png'; // Замените на фактический URL API
  // const params = {
  //   included_tags: [ 'maid'],
  //   height: '>=2000'
  // };
  //
  // const queryParams = new URLSearchParams();
  //
  // for (const key in params) {
  //   if (Array.isArray(params[key])) {
  //     params[key].forEach(value => {
  //       queryParams.append(key, value);
  //     });
  //   } else {
  //     queryParams.set(key, params[key]);
  //   }
  // }
  //
  // const requestUrl = `${apiUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(requestUrl);
    if (response.ok) {
      const data = await response.json();
      return data; // Возвращаем данные для дальнейшего использования
    } else {
      throw new Error('Request failed with status code: ' + response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    return null; // Возвращаем null в случае ошибки
  }
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const chatTitle = msg.chat.title;
  const text = msg.text;
  const nameOfUser = msg.from.first_name;

  switch (text) {
    case "/start":
      await bot.sendMessage(chatId, `Привет ${nameOfUser}!`);
      break;
    case "/start@waifu_mz_bot":
      await bot.sendMessage(chatId, `Привет ${chatTitle}!`);
      break;
    case "/bonus":
      await bot.sendMessage(chatId, `Ваш бонус Макима`);
      break;
    case "/bonus@waifu_mz_bot":
      await bot.sendMessage(chatId, `Ваш бонус Макима`);
      break;
    case "/info":
      await bot.sendMessage(chatId, `Я лучше чем @garem_chatbot`);
      break;
    case "/info@waifu_mz_bot":
      await bot.sendMessage(chatId, `Я лучше чем @garem_chatbot`);
      break;
    case "/trade":
      await bot.sendMessage(chatId, `Менять можно будет тут`);
      break;
    case "/trade@waifu_mz_bot":
      await bot.sendMessage(chatId, `Менять можно будет тут`);
      break;
    case "/store":
      await bot.sendMessage(chatId, `Магаз`);
      break;
    case "/store@waifu_mz_bot":
      await bot.sendMessage(chatId, `Магаз`);
      break;
    case "/waifu@waifu_mz_bot":
        await bot.sendPhoto(chatId, 'https://i.waifu.pics/Tj6Wzwo.png', { caption: "Вот ваше изображение!" });
        break;
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send(`${TOKEN}`);
});

app.listen(8443, () => {
  console.log('Server is running on port 8443');
});
