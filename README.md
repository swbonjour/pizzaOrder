# pizzaOrder

- Кабинет менеджера [orderPizzaCabiner](https://moonlit-quokka-34e20c.netlify.app/)
- SlackBot [SlackBot](https://slack.com/oauth/v2/authorize?client_id=3714160334199.4770067573507&scope=channels:history,chat:write,commands,groups:history,im:history,incoming-webhook,mpim:history,users.profile:read,users:read&user_scope=)

Деплой бота и backend кабинета сделал на railway
Деплой mongo на clever cloud
Деплой фронта на netlify

Для локальной развертки добавлю Docker-compose (12.02 около 21:00)

## Что сделано

"Микросерви Бот"
- [x] Указание всех параметров, требующихся для оформления заказа
- [x] Отправка информации о заказе в кабинет менеджера
- [ ] RabbitMQ отсутствует, честно побоялся браться из за столько короткого срока, но опыт работы с брокерами есть. Писал проект с использование kafka, думаю с реббитом разбирусь за день.
- [x] Добавление в любую slack команду
- [x] node js ts mongo

"Кабинет менеджера"
- [x] SPA Angular ts
- [x] mongo
- [x] Авторизация с использование jwt (пару рутов являются протектед)
- [x] Отображение информации о заказе и клиенте
- [x] Уведомление о изменение заказа в slack
- [ ] Чат на стадии разработки, не хватило времени)

"Развертка"
- [x] Docker как написал выше, будет к 9 вечера по МСК (уверен мало кто работает в вскр, поэтому к моменту просмотра репо он уже будет тут
- [x] Приложение полностью развенуто, как и где написно выше
