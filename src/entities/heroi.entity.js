const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Heroi = sequelize.define('Heroi', {
  
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nomeReal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senhaUltraSecreta: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
});

module.exports = Heroi;