#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Генерирует номер версии на основе текущей даты и времени
 * Формат: YYYY.MM.DD.HHMM
 */
function generateVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}.${month}.${day}.${hours}${minutes}`;
}

/**
 * Обновляет index.html файл, добавляя скрипт с версией
 *
 * @param {string} buildPath - Путь к папке сборки (например, 'dist/lasagna')
 * @param {string} version - Номер версии для инъекции
 * @returns {boolean} - true, если файл был успешно обновлен
 */
function injectVersionToIndexHtml(buildPath, version) {
  const indexPath = path.join(buildPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.warn(`⚠️  Index файл не найден: ${indexPath}`);
    return false;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Удаляем старый скрипт версии, если он вдруг там оказался
  content = content.replace(/<script>window\.__VERSION__\s*=\s*['"].*?['"];<\/script>\s*/, '');
  
  // Добавляем новый скрипт версии перед закрывающим </head>
  const versionScript = `<script>window.__VERSION__ = '${version}';</script>`;
  
  if (content.includes('</head>')) {
    content = content.replace('</head>', `  ${versionScript}\n</head>`);
  } else {
    // Если нет </head>, добавляем в начало body
    content = content.replace('<body>', `<body>\n  ${versionScript}`);
  }
  
  fs.writeFileSync(indexPath, content);
  return true;
}

/**
 * Основная функция
 */
function main() {
  const version = generateVersion();
  console.log(`📦 Генерация версии: ${version}`);

  const buildPath = process.argv[2];
  if (!buildPath) {
    console.error('❌ Ошибка: Не указан путь к папке сборки.');
    console.error('Пример: node scripts/version-inject.js dist/lasagna');
    process.exit(1);
  }

  if (injectVersionToIndexHtml(buildPath, version)) {
    console.log(`✅ Версия добавлена в: ${path.join(buildPath, 'index.html')}`);
    console.log(`🎉 Версия ${version} успешно добавлена.`);
  } else {
    process.exit(1); // Выход с ошибкой, если не удалось обновить файл
  }
}

// Запускаем только если файл выполняется напрямую
if (require.main === module) {
  main();
}

module.exports = { generateVersion, injectVersionToIndexHtml };