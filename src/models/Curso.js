const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Curso = connection.define('Curso', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    duracao_horas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 0
        }
    }
});

module.exports = Curso;
