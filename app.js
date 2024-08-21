import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const TOKEN = process.env.TOKEN;
const TAG = '@waifu_mz_bot';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Запустить бота" },
  { command: "/info", description: "Информация о боте" },
  { command: "/bonus", description: "Получить бонус" },
  { command: "/trade", description: "Обмен" },
  { command: "/store", description: "Магазин" },
  { command: "/waifu", description: "Рандомная тянка" },
]);





bot.onText(/\/find (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1]; // Получаем текст после команды /find

  try {
    const response = await fetch('https://api.jikan.moe/v4/characters?q=' + query);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const character = data.data[0]; // Берем первый результат
      const caption = character.about || 'Описание отсутствует';

      // Ограничиваем длину текста до 1024 символов
      const truncatedCaption = caption.length > 1024 ? caption.slice(0, 1021) + '...' : caption;

      await bot.sendPhoto(chatId, character.images.jpg.image_url, { caption: truncatedCaption });
    } else {
      await bot.sendMessage(chatId, 'Ничего не найдено.');
    }
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, 'Произошла ошибка при поиске.');
  }
});





// Основной обработчик команд
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const chatTitle = msg.chat.title || '';
  const text = msg.text;
  const nameOfUser = msg.from.first_name || 'пользователь';

  switch (text) {
    case "/start":
    case `/start${TAG}`:
      await bot.sendMessage(chatId, `Привет ${nameOfUser}!`);
      break;
    case "/bonus":
    case `/bonus${TAG}`:
      await bot.sendMessage(chatId, `Ваш бонус Макима`);
      break;
    case "/info":
    case `/info${TAG}`:
      await bot.sendMessage(chatId, `Я лучше чем @garem_chatbot`);
      break;
    case "/trade":
    case `/trade${TAG}`:
      await bot.sendMessage(chatId, `Менять можно будет тут`);
      break;
    case "/store":
    case `/store${TAG}`:
      await bot.sendMessage(chatId, `Магаз`);
      break;
    case "/waifu":
    case `/waifu${TAG}`:
      await bot.sendPhoto(chatId, 'https://i.waifu.pics/Tj6Wzwo.png', { caption: "Вот ваше изображение!" });
      break;

    case "/test":
    case `/test${TAG}`:
      await bot.sendMessage(chatId, `Тестовое сообщение от ${nameOfUser} в чате "${chatTitle}, код 200. Все работает"`);
      break;

    default:
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send(`${TOKEN}`);
});

app.listen(8443, () => {
  console.log('Server is running on port 8443');
});
