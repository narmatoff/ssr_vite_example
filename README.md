# SSR Vite Vue3

Описание скриптов:
```json
{
    "dev": "bun server", // запустить в дев режиме (шаблон отдается на лету)
    "build": "bun run build:client && bun run build:server", // собрать клиента и сервер в dist
}
```

## Кратное описание

Скрипт запускает `server.ts`:
- определяем окружение: `const isProduction: boolean = false/true`
- prod/dev:
  - prod: загружается `index.html` из `./dist/client/`.
  - dev: шаблон берем на лету
- Инициализируем сервер `express`
- не продакшен: создаем сервер как `middlaware`
- обрабатываем маршруты:
  - prod: отдаем из `dist/client/` (`landingHtml`)
  - dev: отдаем актуальный index.html

Через `entry-client.ts` подключенному в `index.html` подключаем `main.ts`, в котором создаем инстанс приложения `#app`
В app инициализируем `createSSRApp(App)` где `App` это компонент `vue`.
