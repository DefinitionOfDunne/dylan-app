var User = require('./userModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  User.findById(id)
    .select('-password')
    .exec()
    .then(function(user) {
      if (!user) {
        next(new Error('No user with that id'));
      } else {
        req.user = user;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  User.find({})
    .select('-password')
    .exec()
    .then(function(users){
      res.json(users.map(function(user){
        return user.toJson();
      }));
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var user = req.user.toJson();
  res.json(user.toJson());
};

exports.put = function(req, res, next) {
  var user = req.user;

  var update = req.body;

  _.merge(user, update);

  user.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved.toJson());
    }
  })
};

exports.post = function(req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function(err, user) {
    if(err) { return next(err);}

    res.json({user: user});
  });
};

exports.delete = function(req, res, next) {
  req.user.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed.toJson());
    }
  });
};

