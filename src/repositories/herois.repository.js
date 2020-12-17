const { fn, col, where } = require('sequelize');
const Heroi = require('../entities/heroi.entity');

class HeroisRepository {

    salvar (heroi) {
        return heroi.save();
    }

    countPorNome (nome) {
        return Heroi.count({where: 
            where(fn('LOWER', col('nome')), nome.toLowerCase())
        });
    }

    pegarTodos () {
        return Heroi.findAll();
    }
}

module.exports = HeroisRepository;