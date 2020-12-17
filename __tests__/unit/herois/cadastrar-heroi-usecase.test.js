const faker = require('faker');
const BusinessException = require('../../../src/common/errors/business-exception.error');
const CadastrarHeroiFormObject = require('../../../src/usecases/herois/cadastrar/cadastrar-heroi.formobject');
const CadastrarHeroiUseCase = require('../../../src/usecases/herois/cadastrar/cadastrar-heroi.usecase');

describe('Cadastrar herois UseCase', () => {

    let heroisRepository;
    let cadastrarHeroiUseCase;

    beforeAll(() => {
        heroisRepository = jest.mock();
        heroisRepository.salvar = jest.fn().mockReturnValue(Promise.resolve());
        cadastrarHeroiUseCase = new CadastrarHeroiUseCase(heroisRepository);
    });

    it('deve validar nomes iguais', async () => {
        
        heroisRepository.countPorNome = jest.fn().mockReturnValue(Promise.resolve(1));

        const salvarSpy = jest.spyOn(heroisRepository, 'salvar');

        const senha = faker.internet.password(6);

        const heroi = {
            nome: faker.internet.userName(),
            nomeReal: faker.name.findName(),
            descricao: faker.lorem.words(10),
            senhaUltraSecreta: senha,
            confirmacaoSenhaUltraSecreta: senha,
        };

        await expect(cadastrarHeroiUseCase.execute.bind(cadastrarHeroiUseCase)(new CadastrarHeroiFormObject(heroi))).rejects.
        toThrow(new BusinessException('Já existe um herói com esse nome.', 'HER_02'));

        expect(salvarSpy).not.toHaveBeenCalled();
    });
});