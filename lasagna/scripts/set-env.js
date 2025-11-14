const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const prefix = process.argv.find(arg => arg.startsWith('--prefix=')).split('=')[1];

  // Configure Angular `environment.ts` file path
  const targetPath = `./src/environments/environment.${prefix ? prefix + '.' : ''}ts`;

  // Load node modules
  const colors = require('colors');
  const appVersion = require('../package.json').version;

  // Load .env file if exists (for local development)
  // Try multiple paths for .env file
  const envPaths = [
    'src/environments/.env',  // локальная разработка в папке lasagna/
    '../.env',                // если .env в корне проекта lasagna/
    '.env'                    // fallback для других случаев
  ];

  let envLoaded = false;
  for (const envPath of envPaths) {
    try {
      const result = require('dotenv').config({path: envPath});
      if (!result.error) {
        console.log(colors.green(`Loaded .env from: ${envPath}`));
        envLoaded = true;
        break;
      }
    } catch (e) {
      // Игнорируем ошибки, пробуем следующий путь
    }
  }

  if (!envLoaded) {
    console.log(colors.yellow('No .env file found, using system environment variables only'));
  }

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
    production: true,
    region: '${process.env['LG_APP_REGION'] || 'global'}',
    googleSheets: {
      appsScriptUrl: '${process.env['NG_APP_APPS_SCRIPT_URL'] || ''}'
    },
    policies: {
      privacyPolicyUrl: '${process.env['PRIVACY_POLICY_URL'] || ''}',
      termsOfServiceUrl: '${process.env['TERMS_OF_SERVICE_URL'] || ''}',
      cookiePolicyUrl: '${process.env['COOKIE_POLICY_URL'] || ''}'
    },
    smtp: {
      apiKey: '${process.env['SEND_PULSE_API_KEY'] || ''}',
      apiSecret: '${process.env['SEND_PULSE_API_SECRET'] || ''}',
      domain: '${process.env['SEND_PULSE_DOMAIN'] || ''}',
      supportEmail: '${process.env['SUPPORT_EMAIL']}',
      senderEmail: '${process.env['SENDER_EMAIL']}',
      senderName: '${process.env['SENDER_NAME']}'
    },
    version: '${appVersion}'
  };
  `;

  console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
  console.log(colors.cyan(envConfigFile));

  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
    }
  });
};

setEnv();
