const { Router } = require('express');

const CadastrarHeroiController = require('../usecases/herois/cadastrar/cadastrar-heroi.controller');
const ListarHeroisController = require('../usecases/herois/listar/listar-herois.controller');
const CadastrarHeroiUseCase = require('../usecases/herois/cadastrar/cadastrar-heroi.usecase');
const HeroisRepository = require('../repositories/herois.repository');

const heroisRouter = Router();
const heroisRepository = new HeroisRepository();
const cadastrarHeroiController = new CadastrarHeroiController(new CadastrarHeroiUseCase(heroisRepository));
const listarHeroisController = new ListarHeroisController(heroisRepository);

heroisRouter.post("/", cadastrarHeroiController.execute.bind(cadastrarHeroiController));
heroisRouter.get("/", listarHeroisController.execute.bind(listarHeroisController));

module.exports = heroisRouter;