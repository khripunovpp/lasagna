import TelegramBot from 'node-telegram-bot-api';

const TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

if (!TOKEN || !WEB_APP_URL) {
  throw new Error('BOT_TOKEN or WEB_APP_URL is missing');
}

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Открыть мини-приложение 👇', {
    reply_markup: {
      keyboard: [[
        {
          text: '🚀 Open Mini App',
          web_app: { url: WEB_APP_URL }
        }
      ]],
      resize_keyboard: true
    }
  });
});