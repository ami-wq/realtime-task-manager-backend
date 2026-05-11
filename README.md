# Realtime Task Manager

Web-приложение для управления задачами с использованием WebSocket и микросервисной архитектуры.  
Система поддерживает realtime-обмен сообщениями между клиентами.

---

# Tech Stack

- Node.js (Bun runtime)
- TypeScript
- Express
- WebSocket
- React (frontend в разработке)
- Docker

---

# Клонирование проекта

```bash
git clone https://github.com/ami-wq/realtime-task-manager-backend.git
```

Перейти в директорию проекта:

```bash
cd realtime-task-manager-backend
```

# Backend запуск

## 1. Запуск Docker Desktop

Перед запуском проекта необходимо открыть Docker Desktop и дождаться запуска Docker Engine.

---

## 2. Сборка Docker-образа

```bash
docker build -t ws-backend .
```

## 3. Запуск контейнера

```bash
docker run -p 5000:5000 ws-backend
```

## Ожидаемый результат

После запуска сервера в терминале должно появиться сообщение:

`Server running on port 5000`

# WebSocket Test

## Запуск тест-клиентов

Каждый клиент запускается в отдельном терминале.

## Клиент A

```bash
node test-client/wsClient.js A
```

## Клиент B

```bash
node test-client/wsClient.js B
```

## Клиент C

```bash
node test-client/wsClient.js C
```

## Ожидаемый результат

При подключении клиента:

```
✅ A connected
📩 A received: {"type":"welcome","payload":"Connected to server"}
📩 A received: {"type":"message","payload":"A: hello"}
```

Сообщения каждого клиента рассылаются всем подключённым клиентам:

`📩 A received: {"type":"message","payload":"B: hello"}`

В консоли сервера отображаются события подключения и broadcast сообщений.

# Project Status

На текущий момент реализованы:

- базовая backend-инфраструктура;
- WebSocket сервер;
- realtime broadcast сообщений;
- обработка WebSocket событий;
- тестовые WebSocket-клиенты;
- Docker-конфигурация backend-сервиса.

Frontend и микросервисная архитектура находятся в процессе разработки.
