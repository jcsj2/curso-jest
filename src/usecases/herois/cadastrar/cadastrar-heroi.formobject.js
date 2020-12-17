const Yup = require('yup');
const bcrypt = require('bcrypt');
const Heroi = require("../../../entities/heroi.entity");
const BusinessException = require('../../../common/errors/business-exception.error');

class CadastrarHeroiFormObject {

    constructor ({nome, nomeReal, descricao, senhaUltraSecreta, confirmacaoSenhaUltraSecreta}) {
        this.nome = nome;
        this.nomeReal = nomeReal;
        this.descricao = descricao;
        this.senhaUltraSecreta = senhaUltraSecreta;
        this.confirmacaoSenhaUltraSecreta = confirmacaoSenhaUltraSecreta;

        Yup.object().shape({
            nome: Yup.string().required(),
            nomeReal: Yup.string().required().min(3),
            descricao: Yup.string().required().min(10),
            senhaUltraSecreta: Yup.string().required().min(6),
            confirmacaoSenhaUltraSecreta: Yup.string().required().min(6),
        }).validateSync(this, {abortEarly: false});

        this._validarSenhasIguais();
    }

    toEntity () {

        const senhaUltraSecretaEncriptada = bcrypt.hashSync(this.senhaUltraSecreta, 5);

        return Heroi.build({...this, senhaUltraSecreta: senhaUltraSecretaEncriptada});
    }

    _validarSenhasIguais () {
        
        if (this.senhaUltraSecreta !== this.confirmacaoSenhaUltraSecreta) {
            throw new BusinessException("Senhas são diferentes.", "HER_01");
        }
    }
}

module.exports = CadastrarHeroiFormObject;