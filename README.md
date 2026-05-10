# Realtime Task Manager

Web-приложение для управления задачами с использованием WebSocket и микросервисной архитектуры. Система поддерживает realtime-обмен сообщениями между клиентами.

## Tech Stack
- Node.js (Bun)
- TypeScript
- Express
- WebSocket
- React (в разработке)

## Backend

```bash
bun run dev
```

Должно быть:

`Server running on port 5000`

## WebSocket test

В первом терминале:

```bash
bun run dev
```

Запуск тест-клиентов (каждый в новом терминале):

```bash
bun run test-client/ws-client.ts A
```

```bash
bun run test-client/ws-client.ts B
```

```bash
bun run test-client/ws-client.ts C
```

Ожидаемый результат: каждый клиент получает сообщения от других.
