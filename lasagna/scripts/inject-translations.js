const fs = require('fs');
const path = require('path');

// Список ключей переводов, которые нужны для JS файлов
const TRANSLATION_KEYS = {
  'google-analytics-consent.js': [
    'cookies.banner.text',
    'cookies.banner.accept-all',
    'cookies.banner.analytics-only',
    'cookies.banner.reject-all'
  ],
  'pwa-update-compoent.js': [
    'pwa.update.banner-text',
    'pwa.update.dialog.title',
    'pwa.update.dialog.description',
    'pwa.update.dialog.save-backup',
    'pwa.update.dialog.update-without-backup',
    'pwa.update.dialog.timeout'
  ]
};

// Языки для обработки
const LANGUAGES = ['en', 'ru', 'pt'];

function loadTranslations(lang) {
  const translationPath = path.join(__dirname, '../public/i18n', `${lang}.json`);
  try {
    const content = fs.readFileSync(translationPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return {};
  }
}

function extractNeededTranslations(allTranslations, neededKeys) {
  const extracted = {};
  neededKeys.forEach(key => {
    if (allTranslations[key]) {
      extracted[key] = allTranslations[key];
    } else {
      console.warn(`Translation key "${key}" not found`);
    }
  });
  return extracted;
}

function generateTranslationFunction(translations) {
  return `
// Auto-generated translations - DO NOT EDIT MANUALLY
function getTranslation(key, params = {}) {
  const TRANSLATIONS = ${JSON.stringify(translations, null, 2)};
  
  // Get language with fallback chain
  const lang = (typeof window !== 'undefined' && window.getCurrentLanguage) 
    ? window.getCurrentLanguage()
    : (localStorage.getItem('lang') || 'en');
    
  const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  
  // Replace parameters in translation
  let result = translation;
  Object.keys(params).forEach(param => {
    result = result.replace(new RegExp(\`{$\{param\}}\`, 'g'), params[param]);
  });
  
  return result;
}
`;
}

function injectTranslationsIntoFile(filePath, translations) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Простая и надежная замена: удаляем все между маркерами
    const startMarker = '// START TRANSLATIONS';
    const endMarker = '// END TRANSLATIONS';
    
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error(`❌ Markers not found in ${path.basename(filePath)}`);
      console.error(`Start marker found: ${startIndex !== -1}, End marker found: ${endIndex !== -1}`);
      return;
    }
    
    // Извлекаем части до и после маркеров
    const beforeTranslations = content.substring(0, startIndex);
    const afterTranslations = content.substring(endIndex);
    
    // Создаем новый контент с переводами
    const translationCode = generateTranslationFunction(translations);
    const newContent = beforeTranslations + startMarker + '\n' + translationCode + afterTranslations;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ Translations injected into ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
  }
}

function main() {
  console.log('🚀 Injecting translations into JS files...');
  
  // Загружаем переводы для всех языков
  const allTranslations = {};
  LANGUAGES.forEach(lang => {
    allTranslations[lang] = loadTranslations(lang);
  });
  
  // Обрабатываем каждый JS файл
  Object.keys(TRANSLATION_KEYS).forEach(filename => {
    const filePath = path.join(__dirname, '../public', filename);
    const neededKeys = TRANSLATION_KEYS[filename];
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return;
    }
    
    // Извлекаем нужные переводы для всех языков
    const translationsForFile = {};
    LANGUAGES.forEach(lang => {
      translationsForFile[lang] = extractNeededTranslations(allTranslations[lang], neededKeys);
    });
    
    // Внедряем переводы в файл
    injectTranslationsIntoFile(filePath, translationsForFile);
  });
  
  console.log('✨ Translation injection completed!');
}

if (require.main === module) {
  main();
}

module.exports = { main };
