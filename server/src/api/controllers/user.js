const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length > 0) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(err.status || 500).json({
            message: 'User not created',
            error: err.message,
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then((result) => {
              console.log(result);
              res.status(201).json({
                message: 'User created',
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        return res.status(401).json({
          message: 'Authorization failed',
        });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authorization failed',
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: users[0].email,
              userId: users[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Authorization successful',
            token: token,
          });
        }
        return res.status(401).json({
          message: 'Authorization failed',
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete_user = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      if (!result.deletedCount) {
        return res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      } else {
        res.status(204).json({ message: 'User deleted' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
