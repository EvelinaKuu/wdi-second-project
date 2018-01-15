

function createRoute(req, res) {
  User
  .findOne({ email: req.body.email })
  .then((user) => {
    if(!user || !user.validatePassword(req.body.password)) {
      return res.status(401).render('sessions/new', { message: 'Unrecognized credentials' });
    }
    res.redirect('/');
  })
  .catch((err => res.status(500).send(err));
}
