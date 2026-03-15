export interface Env {
  BOT_TOKEN: string;
  WEB_APP_URL: string;
}

interface TelegramUpdate {
  message?: {
    chat: { id: number };
    text?: string;
  };
}

const tgApi = (token: string, method: string) =>
  `https://api.telegram.org/bot${token}/${method}`;

async function sendMessage(token: string, chat_id: number, text: string, extra?: object) {
  return fetch(tgApi(token, 'sendMessage'), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({chat_id, text, ...extra}),
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/webhook') {
      const update: TelegramUpdate = await request.json();

      if (update.message?.text === '/start') {
        await sendMessage(env.BOT_TOKEN, update.message.chat.id, '👇 Нажмите Открыть, чтобы запустить приложение.');
      }

      return new Response('OK');
    }

    return new Response('Not Found', {status: 404});
  },
};
