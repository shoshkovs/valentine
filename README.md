# Сайт ко дню святого Валентина

Романтический сайт с интерактивными кнопками "Да" и "Нет".

## Особенности

- Адаптивный дизайн для мобильных устройств
- Интерактивная кнопка "Нет", которая перемещается при клике
- Красивый градиентный фон
- Анимации и плавные переходы

## Установка и запуск

### Локальная разработка

1. Добавьте фотографию `photo.jpg` в корневую директорию проекта
2. Откройте `index.html` в браузере

### Docker

1. Убедитесь, что у вас установлен Docker и Docker Compose
2. Добавьте фотографию `photo.jpg` в корневую директорию
3. Соберите и запустите контейнер:

```bash
docker-compose up -d --build
```

Сайт будет доступен на порту 8080.

### Деплой на VPS с Nginx Proxy Manager

1. Склонируйте проект на сервер:
```bash
git clone <your-repo-url> /path/to/valentine
cd /path/to/valentine
```

2. Добавьте фотографию `photo.jpg` в директорию проекта

3. Запустите контейнер:
```bash
docker-compose up -d --build
```

4. В Nginx Proxy Manager создайте новый прокси-хост:
   - **Domain Names**: `i_love_varya.gramila-brooks.site`
   - **Forward Hostname/IP**: `valentine-site` (или `localhost`)
   - **Forward Port**: `8080`
   - Включите SSL (Let's Encrypt)

5. Убедитесь, что контейнер и Nginx Proxy Manager находятся в одной Docker сети, или используйте `host` режим сети.

## Структура проекта

```
valentine/
├── index.html          # Основная HTML страница
├── styles.css          # Стили
├── script.js           # JavaScript логика
├── photo.jpg           # Фотография (добавить самостоятельно)
├── Dockerfile          # Docker образ
├── docker-compose.yml  # Docker Compose конфигурация
├── nginx.conf          # Конфигурация Nginx
└── README.md           # Документация
```

## Настройка

- Замените `photo.jpg` на свою фотографию
- Измените текст в `index.html` при необходимости
- Настройте цвета в `styles.css`

## Требования

- Docker и Docker Compose
- Nginx Proxy Manager (на сервере)
