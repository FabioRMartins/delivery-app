'use strict';
require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: 'user_id', as: 'buyer' });
    User.hasMany(models.Sale, { foreignKey: 'seller_id', as: 'seller' });
  };
  
  return User;
};

