const router = require('express').Router();
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const dbURI = 'mongodb://localhost/bookstore';
mongoose.connect(dbURI, { useMongoClient: true });

const registrations = require('../controllers/registrations');

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);


router.get('/', (req, res) => res.render('statics/index'));

router.get('/lists', (req, res) => res.render('lists/index'));

router.get('/lists/new', (req, res) => res.render('lists/new'));

router.get('/lists/:id', (req, res) => res.render('lists/show'));

router.get('/lists/:id/edit', (req, res) => res.render('lists/edit'));


router.put('/lists/:id', (req, res) => res.send('UPDATE'));

router.delete('/lists/:id', (req, res) => res.send('DELETE'));


module.exports = router;
