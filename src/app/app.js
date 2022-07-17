const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config();

const optionsCreator = (buttons) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: buttons
        })
    }
}

const bot = new TelegramApi('5312862661:AAHPYYDPJ5wwKcrqqR15HRuj7cm3-of8z44', {polling: true});

const data = {
    1: {
        1: 'https://it-karate.notion.site/1-13368abf844340c0b4f57e62591585df',
        2: 'https://it-karate.notion.site/2-ef60722032754c10af655f1dbb7fd6af',
        3: 'https://it-karate.notion.site/3-a6f546947c48438ab803d4d6edc400f2',
        4: 'https://it-karate.notion.site/4-d240140034f64f91b904f620828ebcf5',
        5: 'https://docs.google.com/document/d/1FaJSQELWAI0J4Jv0sfjxxhv2zp_DTgto-h0rWcCgZkA/edit',
        6: 'https://docs.google.com/document/d/1CMlkobpygyqrFRzUXynMjHXYQsT-ZVT7SvGfOqW2eQk/edit',
        7: 'https://docs.google.com/document/d/1zqXfG5MRsEFcDTzUuKL4wVNRsvVmI_1NxTRr508jMzM/edit',
    },
    2: {
        1: 'https://docs.google.com/document/d/1n-PnQl6z3ws3R0wALn-LlWj_vJO4fXIhGb61jrwku6A/edit'
    }
}
const students = {
    'AlmasAbym': 1,
    'AbuEsma': 1,
    'Samatglobal': 2,
    'ayan_rn': 1,
    'rs6avantc7': 1,
    'rakhymzhan_ff': 1,
    'SuanAbzal': 2
}

const lesson1 = [
    [{text: 'Урок 1', callback_data: '1-1'},{text: 'Урок 2', callback_data: '1-2'},{text: 'Урок 3', callback_data: '1-3'}],
    [{text: 'Урок 4', callback_data: '1-4'},{text: 'Урок 5', callback_data: '1-5'},{text: 'Урок 6', callback_data: '1-6'}],
    [{text: 'Урок 7', callback_data: '1-7'}],
]

const lesson2 = [
    [{text: 'Урок 1', callback_data: '2-1'}],
]
const lessons = {
    1: lesson1,
    2: lesson2
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начало общения с ботом'},
        {command: '/get_lesson', description: 'Получить открытые уроки'},
    ])

    bot.on('message', async msg => {
        const command = msg.text;
        const chatId = msg.chat.id;
        const name = msg.from.username;

        const studentGroup = students[name];
        const isStudent = !!studentGroup

        if (isStudent) {
            switch (command) {
                case '/start' :
                    return bot.sendMessage(chatId, 'Hello world!');
                case '/get_lesson' :
                    return bot.sendMessage(chatId, 'Выберите урок:', optionsCreator(lessons[studentGroup]))
                default:
                    return bot.sendMessage(chatId, 'Не понимаю, выберите из меню!')
            }
        } else {
            return bot.sendMessage(chatId, "У вас нету авторизационных прав!");
        }

    })

    bot.on('callback_query', async msg => {
        const [group, _, lesson] = msg.data;
        const chatId = msg.message.chat.id
        const messageId = msg.message.message_id
        await bot.sendMessage(chatId, data[group][lesson])

        setTimeout(() => {
            bot.deleteMessage(chatId, messageId)
        }, 1000)

    })
}

start();

