const router = require('express').Router();

const sessions = require('../controllers/sessions');

const registrations = require('../controllers/registrations');
const lists = require('../controllers/lists');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/lists')
  .get(lists.index)
  .post(secureRoute, lists.create);

router.route('/lists/new')
  .get(secureRoute, lists.new);

router.route('/lists/:id')
  .get(lists.show)
  .put(secureRoute, lists.update)
  .delete(secureRoute, lists.delete);


router.route('/lists/:id/edit')
  .get(secureRoute, lists.edit);

router.route('/lists/:id/items')
  .post(secureRoute, lists.createItem);

router.route('/lists/:id/items/:itemId')
  .delete(secureRoute, lists.deleteItem);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create)
  .post(lists.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


router.all('*', (req, res) => res.notFound());

module.exports = router;
