const User = require('../models').User;
const config = {secret : 'doppiaeast', database: 'postgres://qftioduv:ZPRMRqRgl8yZxdtayEILGwqnP7pUGrDE@fizzy-cherry.db.elephantsql.com:5432/qftioduv'};
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const bcrypt = require('bcrypt-nodejs');



module.exports = {

    checkState(req, res) {
        let content = {
            success: true,
            message: 'Successfully logged in'
          }
        res.send(content);
    },


    registerUser(req, res) {
  return User
    .findOne({where: {user_mail: req.body.user_mail}})
    .then(user => {
      if (user) {
        return res.status(404).send({
            success : false,
            message: 'user already exists',
        });
      } else {
          User.create({
                user_mail : req.body.user_mail,
                user_password : bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null)
          }).then(user =>  {
                console.log('user',user);
                let token = jwt.sign({data:user}, 'doppiaeast', {
                      expiresIn : 60*60*24
                    });
                console.log('token', token);
                let content = {
                      user: user,
                      success: true,
                      message: 'You created a new user',
                      token: token
                    };
              return res.status(200).send(content)
          });

      }
    })
    .catch(error => res.status(400).send(error));
},

    loginUser(req, res) {
      var reqUser = req.body;

      User.findOne({where: { 'user_mail': reqUser.user_mail }}).then((err, user) => {

        if( err )
          return done(err);

        if( !user ) {
          let content = {
            success: false,
            message: 'User does not exists'
          };
          res.send(content);
          return;
        }

        if( !user.validPassword(reqUser.password) ){
          let content = {
            success: false,
            message: 'Incorrect password'
          };
          res.send(content);
          return;
        }

        let token = jwt.sign(user, config.secret, {
          expiresIn : 60*60*24
        });
        let content = {
          user: user,
          success: true,
          message: 'You logged in',
          token: token
        };
        res.send(content);

      })
    },

    create(req, res) {
        return User
            .create({
                user_mail : req.body.user_mail,
                user_password : req.body.user_password,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
  return User
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
}
};