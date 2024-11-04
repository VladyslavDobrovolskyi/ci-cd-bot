require('dotenv').config()
const { Telegraf } = require('telegraf')

// Используем токен из .env
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => ctx.reply('Добро пожаловать! Я ваш бот. Чем могу помочь?'))

bot.on('text', ctx => {
	ctx.reply(`Вы сказали: ${ctx.message.text}`)
})

bot.launch()
	.then(() => console.log('Бот запущен!'))
	.catch(err => console.error('Ошибка запуска бота:', err))

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
