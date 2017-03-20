const User = require('../models').User;

module.exports = {
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