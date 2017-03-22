const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_mail: {
      type : DataTypes.STRING,
        allowNull: false,
    },
    user_password: {
      type : DataTypes.STRING,
        allowNull : false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });






  return User;
};