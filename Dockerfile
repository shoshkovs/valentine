FROM nginx:alpine

# Копируем файлы сайта
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Копируем шрифты
COPY fonts/ /usr/share/nginx/html/fonts/

# Копируем фотографии
COPY photos/ /usr/share/nginx/html/photos/

# Копируем видео
COPY videos/ /usr/share/nginx/html/videos/

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
