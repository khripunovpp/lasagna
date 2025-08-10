const setEnv = () => {
  const fs = require('fs');
  const writeFile = fs.writeFile;
  
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  
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
      const result = require('dotenv').config({ path: envPath });
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
  googleSheets: {
    appsScriptUrl: '${process.env['NG_APP_APPS_SCRIPT_URL'] || ''}'
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
