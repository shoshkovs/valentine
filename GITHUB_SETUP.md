# Настройка GitHub репозитория

## Быстрая инструкция

### 1. Создайте репозиторий на GitHub

1. Зайдите на [github.com](https://github.com) и войдите
2. Нажмите **"+"** → **"New repository"**
3. Имя: `valentine` (или любое другое)
4. Выберите **Private** (рекомендуется)
5. **НЕ** ставьте галочки на README, .gitignore, license
6. Нажмите **"Create repository"**

### 2. Загрузите код на GitHub

Выполните эти команды в терминале (в директории проекта):

```bash
# Перейдите в директорию проекта
cd /Users/alexsho/Documents/05_PROJECTS/VS/valentine

# Инициализируйте Git
git init

# Добавьте все файлы
git add .

# Создайте первый коммит
git commit -m "Initial commit: Valentine's Day website"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/valentine.git

# Отправьте код
git branch -M main
git push -u origin main
```

### 3. Авторизация GitHub

Если GitHub запросит пароль, используйте **Personal Access Token**:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Выберите срок действия и права доступа (нужен `repo`)
4. Скопируйте токен
5. Используйте токен вместо пароля при `git push`

### 4. Альтернатива: SSH ключи

```bash
# Создайте SSH ключ (если еще нет)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Скопируйте публичный ключ
cat ~/.ssh/id_ed25519.pub

# Добавьте ключ на GitHub:
# Settings → SSH and GPG keys → New SSH key
# Вставьте содержимое публичного ключа

# Используйте SSH URL для клонирования
git remote set-url origin git@github.com:YOUR_USERNAME/valentine.git
```

### 5. Клонирование на сервер

```bash
# На вашем VPS сервере
cd /opt
git clone https://github.com/YOUR_USERNAME/valentine.git
cd valentine
```

Для приватного репозитория используйте SSH:
```bash
git clone git@github.com:YOUR_USERNAME/valentine.git
```

## Обновление кода

### На локальном компьютере:
```bash
git add .
git commit -m "Описание изменений"
git push
```

### На сервере:
```bash
cd /opt/valentine
git pull
docker-compose down
docker-compose up -d --build
```

## Полезные команды Git

```bash
# Проверить статус
git status

# Посмотреть изменения
git diff

# Отменить изменения в файле
git checkout -- filename

# Посмотреть историю
git log --oneline
```
