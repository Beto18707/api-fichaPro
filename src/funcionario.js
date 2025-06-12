const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const funcionario = sequelize.define('Funcionario', {
  nome: DataTypes.STRING,
  funcao: DataTypes.STRING,
  telefone: DataTypes.STRING,
  email: DataTypes.STRING,
  cpf: DataTypes.STRING,
  dataEntrada: DataTypes.DATEONLY,
});

module.exports = funcionario;