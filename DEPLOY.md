# 🚀 Инструкция по деплою

## Быстрый деплой на VPS

### Шаг 1: Загрузите код на GitHub

```bash
cd /Users/alexsho/Documents/05_PROJECTS/VS/valentine

git add .
git commit -m "Deploy: WebP images, responsive design, mobile adaptation"
git push
```

---

### Шаг 2: На сервере - обновите код

```bash
ssh root@89.125.1.178
cd /opt/valentine
git pull
```

---

### Шаг 3: Пересоберите и запустите контейнер

```bash
cd /opt/valentine
docker compose down
docker compose build --no-cache
docker compose up -d
```

Проверьте статус:
```bash
docker compose ps
docker compose logs -f valentine
```

---

### Шаг 4: Настройте Nginx Proxy Manager

1. Откройте: `http://89.125.1.178:81`
2. Войдите в систему
3. Создайте/обновите Proxy Host:
   - **Domain Names:** `i_love_varya.gramila-brooks.site`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `localhost`
   - **Forward Port:** `8080`
   - **SSL:** Включите Let's Encrypt

---

### Шаг 5: Проверьте сайт

Откройте: `https://i_love_varya.gramila-brooks.site`

---

## Обновление сайта в будущем

```bash
# На вашем компьютере
git add .
git commit -m "Описание изменений"
git push

# На сервере
cd /opt/valentine
git pull
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## Полезные команды

```bash
# Логи контейнера
docker compose logs -f valentine

# Перезапуск
docker compose restart

# Остановка
docker compose down

# Статус
docker compose ps
```

---

## Структура проекта

```
valentine/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── index.html
├── styles.css
├── script.js
├── fonts/
├── photos/        (WebP формат)
└── videos/
```

---

## Технические детали

- **Порт контейнера:** 8080
- **Внутренний порт:** 80
- **Формат изображений:** WebP
- **Адаптивный дизайн:** Да
- **Мобильная версия:** Полностью адаптирована
