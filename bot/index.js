import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';

const TOKEN = process.env.BOT_TOKEN;
const WEB_APP_URL = process.env.WEB_APP_URL;

if (!TOKEN || !WEB_APP_URL) {
    throw new Error('BOT_TOKEN or WEB_APP_URL is missing');
}

const bot = new TelegramBot(TOKEN, {polling: true});
const app = express();

app.use(cors());
app.use(express.json());

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Открыть мини-приложение 👇', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: '🚀 Open Mini App',
                    web_app: {
                        url: WEB_APP_URL
                    }
                }
            ]],
        }
    });
});

// Хранилище для валидации (опционально)
const invoiceStore = new Map();

function extractCreateInvoiceLinkParams(
    body
) {
    return {
        amount: parseInt(body.amount),
        description: body.description,
        user_id: body.user_id,
    }
}

// API для создания ссылки на инвойс
app.post('/api/create-invoice-link', async (req, res) => {
    try {
        const {user_id, amount, description} = extractCreateInvoiceLinkParams(req.body);

        console.log('Creating invoice link for user:', user_id, 'amount:', amount);

        if (!user_id || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Missing user_id or amount'
            });
        }


        if (amount < 1 || amount > 10000) {
            return res.status(400).json({
                success: false,
                error: 'Amount must be between 1 and 10000 stars'
            });
        }

        // Генерируем уникальный payload
        const payload = `stars_${user_id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        //
        // // СОЗДАЕМ ССЫЛКУ НА ИНВОЙС!
        // const invoiceLink = await bot.createInvoiceLink(
        //     `${amount} Telegram Stars`,
        //     description || `Purchase ${amount} Telegram Stars`,
        //     payload,
        //     '', // provider_token - пусто для Telegram Stars
        //     'XTR', // currency для Stars
        //     [{label: `${amount} Stars`, amount: amount * 100}],
        //     {
        //         // Опциональные параметры
        //         start_parameter: payload,
        //         photo_url: 'https://cdn-icons-png.flaticon.com/512/2107/2107845.png',
        //         photo_width: 200,
        //         photo_height: 200,
        //         need_name: false,
        //         need_phone_number: false,
        //         need_email: false,
        //         need_shipping_address: false,
        //         is_flexible: false
        //     }
        // );

        const invoiceLink = 'link-test';

        console.log('Created invoice link:', invoiceLink);

        // Сохраняем информацию об инвойсе (для валидации)
        invoiceStore.set(payload, {
            user_id: String(user_id),
            amount: amount,
            link: invoiceLink,
            createdAt: Date.now(),
            status: 'pending'
        });

        // Очищаем через час
        setTimeout(() => {
            if (invoiceStore.get(payload)?.status === 'pending') {
                invoiceStore.delete(payload);
            }
        }, 3600000);

        res.json({
            invoice_link: invoiceLink,
        });

    } catch (error) {
        console.error('Error creating invoice link:', error);
        res.status(500).json({
            success: false,
            error: error.message || 'Failed to create invoice link'
        });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Bot is running in polling mode`);
});