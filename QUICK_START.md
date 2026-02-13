# Быстрый старт - что делать сейчас

## ✅ Шаг 1: Загрузите код на GitHub (на вашем компьютере)

Откройте терминал и выполните:

```bash
cd /Users/alexsho/Documents/05_PROJECTS/VS/valentine

git init
git add .
git commit -m "Initial commit: Valentine's Day website"
git remote add origin https://github.com/shoshkovs/valentine.git
git branch -M main
git push -u origin main
```

**Если GitHub запросит пароль:**
- Используйте Personal Access Token (не пароль)
- Создайте токен: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
- Выберите `repo` (полный доступ)
- Скопируйте токен и используйте его вместо пароля

---

## ✅ Шаг 2: На сервере клонируйте репозиторий

Подключитесь к вашему VPS:

```bash
ssh user@your-server-ip
```

Затем:

```bash
cd /opt
git clone https://github.com/shoshkovs/valentine.git
cd valentine
```

---

## ✅ Шаг 3: Запустите Docker контейнер

На сервере выполните:

```bash
docker-compose up -d --build
```

Проверьте, что контейнер запущен:

```bash
docker ps
```

Должен быть виден контейнер `valentine`.

---

## ✅ Шаг 4: Настройте Nginx Proxy Manager

1. Откройте веб-интерфейс: `http://your-server-ip:81`

2. Войдите (по умолчанию: `admin@example.com` / `changeme`)

3. Создайте новый Proxy Host:
   - **Domain Names:** `i_love_varya.gramila-brooks.site`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `localhost` (или IP вашего сервера)
   - **Forward Port:** `8080`
   - **SSL:** Включите и запросите Let's Encrypt сертификат

4. Сохраните

---

## ✅ Шаг 5: Проверьте сайт

Откройте: `https://i_love_varya.gramila-brooks.site`

🎉 Готово!

---

## Если что-то пошло не так:

```bash
# Посмотреть логи контейнера
docker-compose logs -f valentine

# Перезапустить контейнер
docker-compose restart

# Остановить и запустить заново
docker-compose down
docker-compose up -d --build
```
