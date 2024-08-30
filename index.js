import express from 'express';

import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const TOKEN = process.env.TOKEN;
const DEFAULT_CHAT_ID = process.env.CHATID;
const TAG = '@waifu_mz_bot';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
    { command: "/start", description: "Запустить бота" },
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





bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const chatTitle = msg.chat.title || '';
    const text = msg.text;
    const nameOfUser = msg.from.first_name || 'пользователь';

    if(chatId != DEFAULT_CHAT_ID){
        await bot.sendMessage(chatId, 'I already have my boss! His tech channel - @hoichannel');
    }else{
        switch (text) {
            case "/start":
            case `/start${TAG}`:
                await bot.sendMessage(chatId, `Привет ${nameOfUser} в чате ${chatTitle} с айдишка ${chatId}!`);
                break;
        }
    }

});


const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.listen(3001, () => {
    console.log('listening on http://localhost:3001');
})