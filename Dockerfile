# Базовый образ
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Устанавливаем библиотеку dotenv-cli для загрузки .env-файла
RUN npm install -g dotenv-cli

# Указываем команду запуска контейнера, используя dotenv для подгрузки .env
CMD ["dotenv", "-e", ".env", "node", "bot.js"]
