const CadastrarHeroiFormObject = require("./cadastrar-heroi.formobject");

class CadastrarHeroiController {

    constructor (cadastrarHeroiUseCase) {
        this.cadastrarHeroiUseCase = cadastrarHeroiUseCase;
    }

    async execute (req, res) {

        const { body } = req;

        const cadastrarHeroiFormObject = new CadastrarHeroiFormObject(body);
        await this.cadastrarHeroiUseCase.execute(cadastrarHeroiFormObject);

        res.sendStatus(201);
    }
}

module.exports = CadastrarHeroiController;