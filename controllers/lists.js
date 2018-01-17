const List = require('../models/list');

function indexRoute(req, res, next) {
  List
    .find({ createdBy: req.user.id })
    .populate('createdBy')
    .exec()
    .then((lists) => res.render('lists/index', { lists }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('lists/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  List
    .create(req.body)
    .then((list) => res.redirect(`/lists/${list.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/lists/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  List
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then(list => {
      if(!list) return res.notFound();
      return res.render('lists/show', { list });
    })
    .catch(next);
}

function editRoute(req,res) {
  List
    .findById(req.params.id)
    .exec()
    .then((list) => {
      if(!list) return res.status(404).end();
      res.render('lists/edit', {list});
    })
    .catch((err) =>{
      res.status(500).render('error', {err});
    });
}

function updateRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if(!list) return res.notFound();
      for(const field in req.body) {
        list[field] = req.body[field];
      }
      return list.save();
    })
    .then(() => res.redirect(`/lists/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/lists/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function createProductRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      console.log(list);

      if (!list) return res.notFound();
      list.products.push(req.body);

      return list.save();
    })
    .then(() => res.redirect(`/lists/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/lists/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteProductRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if (!list) return res.notFound();
      list.products.id(req.params.productId).remove();

      return list.save();
    })
    .then(list => res.redirect(`/lists/${list.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  createProduct: createProductRoute,
  deleteProduct: deleteProductRoute
};
