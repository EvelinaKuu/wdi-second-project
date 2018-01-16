const List = require('../models/list');

function indexRoute(req, res, next) {
  List
    .find()
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
    .populate('createdBy items.createdBy')
    .exec()
    .then(list => {
      if(!list) return res.notFound();
      return res.render('lists/show', { list });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if(!list) return res.redirect();
      // if(!list.createdBy.id === req.user.id) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('lists/edit', { list });
    })
    .catch(next);
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

function deleteRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if(!list) return res.notFound();
      return list.remove();
    })
    .then(() => res.redirect('/lists'))
    .catch(next);
}

function createItemRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if (!list) return res.notFound();

      req.body.createdBy = req.user;
      list.items.push(req.body);

      return list.save();
    })
    .then(() => res.redirect(`/lists/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/lists/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteItemRoute(req, res, next) {
  List
    .findById(req.params.id)
    .exec()
    .then(list => {
      if (!list) return res.notFound();
      list.items.id(req.params.itemId).remove();

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
  delete: deleteRoute,
  createItem: createItemRoute,
  deleteItem: deleteItemRoute
};
