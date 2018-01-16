const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

// also const List
const User = require('../models/user');
const List = require('../models/list');

User.collection.drop();
List.collection.drop();

User
  .create([{
    username: 'p',
    email: 'p@p',
    password: 'p',
    passwordConfirmation: 'p'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);

    return List
      .create([{
        name: 'Things I need to get',
        createdBy: users[0],
        products: [{
          name: 'mascara',
          category: 'eyes'
        }]

      }]);
  })
  .then((lists) => console.log(`${lists.length} lists created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
