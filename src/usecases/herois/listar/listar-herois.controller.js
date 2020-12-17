class ListarHeroisController {

    constructor (heroisRepository) {
        this.heroisRepository = heroisRepository;
    }

    async execute (_, res) {

        const resultado = {
            herois: await this.heroisRepository.pegarTodos()
        }

        res.json(resultado);
    }
}

module.exports = ListarHeroisController;