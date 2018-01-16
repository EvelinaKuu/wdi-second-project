const User = require('../models/user');
const List = require('../models/list');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then((user) => {

      List
        .create([
          {
            name: 'Things I already have',
            createdBy: user
          },
          {
            name: 'Things I want to get',
            createdBy: user
          }
        ]);

      req.flash('info', `Thanks for registering, ${user.username}! Now please login.`);
      res.redirect('/login');
    })

    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/register', err.toString());
      }
      next(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
