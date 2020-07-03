# API News-explorer
##### Актуальная версия 0.0.1
---
API реализован на сервере:
`84.201.141.27` || `api.jswa.online`
---
### Установка:
Клонируем репозиторий
>`$ git clone git@github.com:YaVladislav/news-explorer-api.git`

Открываем проект в терминале и устанавливаем зависимости
>`$ npm install`

### Запуск:
На localhost:3000
>`$ npm run start`

На localhost:3000 с хот релоудом
>`$ npm run dev`

---
### Описание REST API:

создаёт пользователя с переданными в теле email, password и name
>`POST /signup`

проверяет переданные в теле почту и пароль и возвращает JWT
>`POST /signin`

возвращает информацию о пользователе (email и имя)
>`GET /users/me`

возвращает все сохранённые пользователем статьи
>`GET /articles`

создаёт статью с переданными в теле keyword, title, text, date, source, link и image
>`POST /articles`

удаляет сохранённую статью  по _id
>`DELETE /articles/articleId`