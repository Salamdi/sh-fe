const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /login': 'AuthController.login',
  'POST /validate': 'AuthController.validate',
  'GET /random': 'RandomJokesController.randomJokes',
};

module.exports = publicRoutes;
