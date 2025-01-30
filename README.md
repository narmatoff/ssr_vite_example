# SSR Vite Vue3

Описание скриптов:
```json
{
    "dev": "node server", // запустить в дев режиме (шаблон отдается на лету)
    "build": "npm run build:client && npm run build:server", // собрать клиента и сервер в dist
    "preview": "cross-env NODE_ENV=production node server" // прод
}
```

## Кратное описание

Скрипт запускает `server.js`:
- в проде загружается `index.html` из `./dist/client/`.
- В деве шаблон берем на лету
- Инициализируем сервер `express`
- не продакшен: создаем сервер как `middlaware`
- обрабатываем маршруты. (dev: отдаем актуальный index.html, prod: отдаем из `dist/client/` `landingHtml`)

Через `entry-client.js` подключенному в `index.html` подключаем `main.js`, в котором создаем инстанс приложения `#app`
В app инициализируем `createSSRApp(App)` где это компонент `vue`.

