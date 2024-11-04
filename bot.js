require('dotenv').config();
const { Telegraf } = require('telegraf');

// URL для триггера Jenkins
const JENKINS_TRIGGER_URL = process.env.JENKINS_TRIGGER_URL;

// Создаем экземпляр бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Команда /start
bot.start((ctx) => ctx.reply('Добро пожаловать! Используйте команду /start_build для запуска сборки.'));

// Команда для триггера Jenkins
bot.command('start_build', async (ctx) => {
  try {
    // Запрос на запуск задачи в Jenkins с использованием fetch
    const response = await fetch(JENKINS_TRIGGER_URL);
    
    if (response.ok) {
      ctx.reply('Сборка успешно запущена в Jenkins!');
    } else {
      ctx.reply('Ошибка при запуске сборки в Jenkins. Проверьте настройки.');
    }
  } catch (error) {
    console.error('Ошибка запуска сборки:', error);
    ctx.reply('Не удалось запустить сборку. Пожалуйста, проверьте настройки Jenkins.');
  }
});

// Ответ на любое текстовое сообщение
bot.on('text', (ctx) => {
  ctx.reply(`Вы сказали: ${ctx.message.text}`);
});

// Запуск бота
bot.launch()
  .then(() => console.log('Бот запущен!'))
  .catch((err) => console.error('Ошибка запуска бота:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
