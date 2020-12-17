const BusinessException = require("../../../common/errors/business-exception.error");

class CadastrarHeroiUseCase {

    constructor (heroisRepository) {
        this.heroisRepository = heroisRepository;
    }

    async execute (cadastrarHeroiFormObject) {

        await this._validarNomesIguais(cadastrarHeroiFormObject.nome);

        const heroi = cadastrarHeroiFormObject.toEntity();
        this.heroisRepository.salvar(heroi);
    }

    async _validarNomesIguais (nome) {
        const countHeroiPorNome = await this.heroisRepository.countPorNome(nome);
        if (countHeroiPorNome > 0) {
            throw new BusinessException("Já existe um herói com esse nome.", "HER_02");
        }
    }
}

module.exports = CadastrarHeroiUseCase;