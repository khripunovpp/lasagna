# Настройка синхронизации для Lasagna

Этот документ описывает настройку облачной синхронизации для приложения Lasagna с использованием Strapi.

## Структура API

### Схемы данных

#### Product (Продукт)
- `name` - название продукта
- `price` - цена
- `amount` - количество
- `source` - источник (магазин)
- `unit` - единица измерения (gram, portion, piece)
- `color` - цвет для UI
- `uuid` - уникальный идентификатор
- `cloud_uuid` - идентификатор в облаке
- `syncedAt` - время последней синхронизации
- `dirtyToSync` - флаг для синхронизации
- `category` - связь с категорией
- `user` - связь с пользователем

#### Category (Категория)
- `name` - название категории
- `color` - цвет для UI
- `system` - системная категория
- `uuid` - уникальный идентификатор
- `cloud_uuid` - идентификатор в облаке
- `syncedAt` - время последней синхронизации
- `dirtyToSync` - флаг для синхронизации
- `products` - связь с продуктами
- `recipes` - связь с рецептами
- `user` - связь с пользователем

#### Recipe (Рецепт)
- `name` - название рецепта
- `description` - описание
- `outcome_unit` - единица измерения результата
- `outcome_amount` - количество результата
- `taxTemplateName` - шаблон налогов
- `tags` - теги (JSON)
- `color` - цвет для UI
- `priceModifiers` - модификаторы цены (JSON)
- `uuid` - уникальный идентификатор
- `cloud_uuid` - идентификатор в облаке
- `syncedAt` - время последней синхронизации
- `dirtyToSync` - флаг для синхронизации
- `category` - связь с категорией
- `user` - связь с пользователем
- `ingredients` - связь с ингредиентами

#### Ingredient (Ингредиент)
- `name` - название ингредиента
- `amount` - количество
- `unit` - единица измерения
- `uuid` - уникальный идентификатор
- `cloud_uuid` - идентификатор в облаке
- `syncedAt` - время последней синхронизации
- `dirtyToSync` - флаг для синхронизации
- `product` - связь с продуктом
- `recipe` - связь с рецептом

#### User (Пользователь)
Используется встроенная система пользователей Strapi (`plugin::users-permissions.user`):
- `username` - имя пользователя
- `email` - email
- `provider` - провайдер аутентификации
- `confirmed` - подтвержден ли email
- `blocked` - заблокирован ли пользователь
- `role` - роль пользователя
- `created_at` - дата создания
- `updated_at` - дата обновления

## API Endpoints

### Синхронизация данных
```
POST /api/sync/data
Content-Type: application/json

{
  "data": {
    "products": [...],
    "categories": [...],
    "recipes": [...],
    "ingredients": [...]
  },
  "userId": "user-uuid"
}
```

### Получение статуса синхронизации
```
GET /api/sync/status/:userId
```

### Получение "грязных" данных
```
GET /api/sync/dirty/:userId
```

## Настройка

### 1. Установка зависимостей
```bash
cd api-chef
npm install
```

### 2. Настройка базы данных
```bash
# Создание базы данных
npm run strapi develop
```

### 3. Настройка CORS
В файле `config/middlewares.js` добавьте:
```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### 4. Настройка CORS в config/cors.js
```javascript
module.exports = {
  enabled: true,
  origin: ['http://localhost:4200', 'https://your-domain.com'],
  credentials: true,
};
```

### 5. Настройка аутентификации
В файле `config/plugins.js`:
```javascript
module.exports = {
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '30d',
      },
    },
  },
};
```

## Использование

### 1. Запуск сервера
```bash
npm run develop
```

### 2. Создание пользователя
Через админ-панель Strapi создайте пользователя. В Strapi пользователи имеют числовые ID (1, 2, 3...), которые используются для связи с данными.

### 3. Тестирование API
```bash
# Тест синхронизации
curl -X POST http://localhost:1337/api/sync/data \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "products": [],
      "categories": [],
      "recipes": [],
      "ingredients": []
    },
    "userId": "1"
  }'
```

## Безопасность

1. Все API endpoints требуют аутентификации
2. Данные пользователей изолированы
3. UUID используются для уникальной идентификации
4. Флаги `dirtyToSync` предотвращают ненужные обновления

## Мониторинг

- Логи синхронизации сохраняются в Strapi
- Статус синхронизации доступен через API
- Ошибки синхронизации возвращаются в ответе

## Развертывание

### Production
1. Настройте переменные окружения
2. Используйте production базу данных
3. Настройте SSL/TLS
4. Настройте брандмауэр

### Docker
```bash
docker build -t lasagna-api .
docker run -p 1337:1337 lasagna-api
```

## Поддержка

При возникновении проблем:
1. Проверьте логи Strapi
2. Убедитесь в правильности схем данных
3. Проверьте настройки CORS
4. Убедитесь в корректности UUID 