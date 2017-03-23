const User = require('../models').User;
const config = {secret : 'azertyuiopmlkjhgfdsqwxcvbn', database: 'postgres://qftioduv:ZPRMRqRgl8yZxdtayEILGwqnP7pUGrDE@fizzy-cherry.db.elephantsql.com:5432/qftioduv'};
const jwt = require('jsonwebtoken');
const auth = require('../auth');
const bcrypt = require('bcrypt-nodejs');



module.exports = {

    checkState(req, res) {
        console.log('check-headers', req.headers);
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
        return res.send({
            success : false,
            message: 'user already exists',
        });
      } else {
          User.create({
                user_mail : req.body.user_mail,
                user_password : bcrypt.hashSync(req.body.user_password, bcrypt.genSaltSync(8), null)
          }).then(user =>  {
                console.log('user',user);
                let token = jwt.sign({data:user}, 'azertyuiopmlkjhgfdsqwxcvbn', {
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
  return User
    .findOne({where: {user_mail: req.body.user_mail}})
    .then(user => {
      if (!user) {
        return res.send({
            success : false,
            message: 'user does not exist',
        });
      }

      if (!bcrypt.compareSync(req.body.user_password, user.user_password)) {
          return res.send({
              success : false,
              message : 'incorrect password',
          });
      }

                console.log('user',user);
                let token = jwt.sign({data:user}, 'azertyuiopmlkjhgfdsqwxcvbn', {
                      expiresIn : 60
                    });
                console.log('token', token);
                let content = {
                      user: user,
                      success: true,
                      message: 'You logged in',
                      token: token
                    };
              return res.status(200).send(content)

    })
    .catch(error => res.status(400).send(error));
},
    list(req, res) {
  return User
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
}
};