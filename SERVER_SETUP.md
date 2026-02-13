# Установка Docker и Docker Compose на сервере

## Если Docker не установлен:

```bash
# Обновляем пакеты
apt update

# Устанавливаем зависимости
apt install -y ca-certificates curl gnupg lsb-release

# Добавляем официальный GPG ключ Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

# Добавляем репозиторий Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Устанавливаем Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Проверяем установку
docker --version
docker compose version
```

## Если Docker установлен, но нет docker-compose:

### Вариант 1: Использовать новую команду (рекомендуется)
```bash
# Вместо docker-compose используйте:
docker compose up -d --build
```

### Вариант 2: Установить старую версию docker-compose
```bash
apt install -y docker-compose
```

## После установки:

```bash
cd /opt/valentine
docker compose up -d --build
# или
docker-compose up -d --build
```
