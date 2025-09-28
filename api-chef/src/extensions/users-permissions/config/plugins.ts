import {env} from "@strapi/utils";

const cfg = () => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.sendpulse.com'),
        port: env('SMTP_PORT', 587),
        secure: false, // true только если используешь порт 465
        auth: {
          user: env('SMTP_USER'),

          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_SENDER_EMAIL')
      },
    },
  },
});

console.log({cfg:JSON.stringify(cfg(),null,2)},env('SMTP_SENDER_EMAIL'));

export default () => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.sendpulse.com'),
        port: env('SMTP_PORT', 587),
        secure: false, // true только если используешь порт 465
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_SENDER_EMAIL')
      },
    },
  },
});
