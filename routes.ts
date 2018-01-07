const routes = require('next-routes')()
routes.add('index', '/')
routes.add('login', '/login')
routes.add('profile', '/profile')
routes.add('register', '/register/:type(junior|upper|team)')

export default routes