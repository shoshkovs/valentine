# Инструкция по деплою на VPS

## Подготовка

1. Убедитесь, что на сервере установлены:
   - Docker
   - Docker Compose
   - Nginx Proxy Manager (уже установлен)

## Шаг 1: Создание GitHub репозитория

### 1.1. Создайте репозиторий на GitHub

1. Перейдите на [GitHub.com](https://github.com) и войдите в аккаунт
2. Нажмите кнопку **"New"** или **"+"** → **"New repository"**
3. Заполните:
   - **Repository name:** `valentine` (или любое другое имя)
   - **Description:** (опционально)
   - **Visibility:** Private (рекомендуется) или Public
   - **НЕ** ставьте галочки на "Add a README file", "Add .gitignore", "Choose a license"
4. Нажмите **"Create repository"**

### 1.2. Загрузите код на GitHub

```bash
# На вашем локальном компьютере (в директории проекта)
cd /Users/alexsho/Documents/05_PROJECTS/VS/valentine

# Инициализируйте Git (если еще не сделано)
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: Valentine's Day website"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/valentine.git

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

**Если GitHub запросит авторизацию:**
- Используйте Personal Access Token вместо пароля
- Или настройте SSH ключи

### 1.3. Клонирование на сервер

```bash
# На вашем VPS сервере
cd /opt  # или другая директория для проектов

# Клонируйте репозиторий
git clone https://github.com/YOUR_USERNAME/valentine.git

# Перейдите в директорию проекта
cd valentine
```

**Для приватного репозитория:**
- Используйте SSH: `git clone git@github.com:YOUR_USERNAME/valentine.git`
- Или Personal Access Token в URL: `https://TOKEN@github.com/YOUR_USERNAME/valentine.git`

### Вариант B: Через SCP

```bash
# На вашем локальном компьютере
scp -r * user@your-server-ip:/opt/valentine/
```

### Вариант C: Через SFTP

Используйте FileZilla или другой SFTP клиент для загрузки всех файлов в `/opt/valentine/` на сервере.

## Шаг 2: Настройка Docker Compose

Убедитесь, что `docker-compose.yml` существует и настроен правильно. Если его нет, создайте:

```yaml
version: '3.8'

services:
  valentine:
    build: .
    container_name: valentine
    restart: unless-stopped
    ports:
      - "8080:80"  # Внутренний порт 80, внешний 8080 (или любой свободный)
    networks:
      - valentine-network

networks:
  valentine-network:
    driver: bridge
```

## Шаг 3: Запуск контейнера

```bash
cd /opt/valentine
docker-compose up -d --build
```

Проверьте, что контейнер запущен:
```bash
docker ps
```

Должен быть виден контейнер `valentine`.

## Шаг 4: Настройка Nginx Proxy Manager

1. Откройте веб-интерфейс Nginx Proxy Manager (обычно `http://your-server-ip:81`)

2. Войдите в систему (по умолчанию: `admin@example.com` / `changeme`)

3. Создайте новый Proxy Host:
   - **Details:**
     - Domain Names: `i_love_varya.gramila-brooks.site`
     - Scheme: `http`
     - Forward Hostname/IP: `valentine` (имя контейнера Docker) или IP вашего сервера
     - Forward Port: `8080` (внешний порт из docker-compose.yml)
     - Cache Assets: ✅ (включить)
     - Block Common Exploits: ✅ (включить)
     - Websockets Support: ❌ (не нужно)

   - **SSL:**
     - SSL Certificate: Request a new SSL Certificate
     - Force SSL: ✅ (включить)
     - HTTP/2 Support: ✅ (включить)
     - Email Address for Let's Encrypt: ваш email
     - Agree to Let's Encrypt Terms: ✅

4. Сохраните настройки

## Шаг 5: Проверка

Откройте в браузере: `https://i_love_varya.gramila-brooks.site`

Сайт должен открыться!

## Обновление сайта

Если нужно обновить сайт после изменений:

```bash
cd /opt/valentine
docker-compose down
docker-compose up -d --build
```

Или если используете Git:

```bash
cd /opt/valentine
git pull
docker-compose down
docker-compose up -d --build
```

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f valentine

# Остановка контейнера
docker-compose down

# Перезапуск контейнера
docker-compose restart

# Просмотр статуса
docker-compose ps
```

## Решение проблем

### Контейнер не запускается
```bash
docker-compose logs valentine
```

### Порт занят
Измените порт в `docker-compose.yml`:
```yaml
ports:
  - "8081:80"  # Используйте другой свободный порт
```

### Nginx Proxy Manager не видит контейнер
Убедитесь, что в `docker-compose.yml` указана правильная сеть, или используйте `host.docker.internal` вместо `localhost` в настройках Proxy Host.

## Структура файлов на сервере

```
/opt/valentine/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── index.html
├── styles.css
├── script.js
├── fonts/
├── photos/
└── videos/
```
