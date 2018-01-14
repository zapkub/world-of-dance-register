const routes = require('next-routes')()
routes.add('index', '/')
routes.add('login', '/login')
routes.add('profile', '/profile')
routes.add('thankyou', '/thankyou')
routes.add('register', '/register/:type(junior|upper|team|junior_team|upper_team)')

routes.add('view', '/view/:id')

export default routes