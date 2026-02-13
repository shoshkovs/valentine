# 🚀 Быстрый деплой - пошаговая инструкция

## Шаг 1: Загрузите код на GitHub (если еще не сделали)

На вашем компьютере в терминале:

```bash
cd /Users/alexsho/Documents/05_PROJECTS/VS/valentine

git add .
git commit -m "Update: улучшена адаптивность"
git push
```

---

## Шаг 2: На сервере - установите Docker (если не установлен)

Подключитесь к серверу:
```bash
ssh root@89.125.1.178
```

Проверьте, установлен ли Docker:
```bash
docker --version
```

Если Docker не установлен, выполните:
```bash
apt update
apt install -y ca-certificates curl gnupg lsb-release

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

## Шаг 3: Обновите код на сервере

```bash
cd /opt/valentine
git pull
```

---

## Шаг 4: Запустите Docker контейнер

```bash
# Используйте новую команду (docker compose без дефиса)
docker compose up -d --build

# ИЛИ если не работает, установите старую версию:
apt install -y docker-compose
docker-compose up -d --build
```

Проверьте, что контейнер запущен:
```bash
docker ps
```

Должен быть виден контейнер `valentine`.

---

## Шаг 5: Настройте Nginx Proxy Manager

1. Откройте в браузере: `http://89.125.1.178:81`

2. Войдите в систему (если еще не меняли: `admin@example.com` / `changeme`)

3. Создайте новый **Proxy Host**:
   - **Details:**
     - Domain Names: `i_love_varya.gramila-brooks.site`
     - Scheme: `http`
     - Forward Hostname/IP: `localhost` (или `127.0.0.1`)
     - Forward Port: `8080`
     - ✅ Cache Assets
     - ✅ Block Common Exploits
     - ❌ Websockets Support

   - **SSL:**
     - SSL Certificate: Request a new SSL Certificate
     - ✅ Force SSL
     - ✅ HTTP/2 Support
     - Email Address for Let's Encrypt: ваш email
     - ✅ Agree to Let's Encrypt Terms

4. Нажмите **Save**

---

## Шаг 6: Проверьте сайт

Откройте: `https://i_love_varya.gramila-brooks.site`

🎉 Готово!

---

## Если что-то не работает:

### Контейнер не запускается:
```bash
cd /opt/valentine
docker compose logs -f valentine
```

### Перезапустить контейнер:
```bash
cd /opt/valentine
docker compose down
docker compose up -d --build
```

### Проверить, что порт 8080 открыт:
```bash
netstat -tulpn | grep 8080
```

### Проверить логи Nginx в контейнере:
```bash
docker compose exec valentine nginx -t
docker compose logs valentine
```

---

## Обновление сайта в будущем:

```bash
# На вашем компьютере
git add .
git commit -m "Описание изменений"
git push

# На сервере
cd /opt/valentine
git pull
docker compose down
docker compose up -d --build
```
