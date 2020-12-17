const faker = require('faker');
const bcrypt = require('bcrypt');
const CadastrarHeroiFormObject = require('../../../src/usecases/herois/cadastrar/cadastrar-heroi.formobject');
const BusinessException = require('../../../src/common/errors/business-exception.error');
const { ValidationError } = require('yup');

describe('Cadastrar herois FormObject', () => {
    it ('deve criar FormObject', () => {
        
        const senha = faker.internet.password(6);

        const heroi = {
            nome: faker.internet.userName(),
            nomeReal: faker.name.findName(),
            descricao: faker.lorem.words(10),
            senhaUltraSecreta: senha,
            confirmacaoSenhaUltraSecreta: senha,
        };

        expect(() => {
            new CadastrarHeroiFormObject(heroi);
        }).not.toThrow();
    });

    it ('deve validar campos', () => {
        
        let heroi = {
        };

        try {
            new CadastrarHeroiFormObject(heroi);
        } catch (err) {
            expect(err).toBeInstanceOf(ValidationError);
            expect(err.errors).toEqual(expect.arrayContaining([
                "nomeReal is a required field", 
                "nome is a required field", 
                "descricao is a required field", 
                "senhaUltraSecreta is a required field", 
                "confirmacaoSenhaUltraSecreta is a required field"
            ]));
        }

        heroi = {
            nome: 'n',
            nomeReal: 'nr',
            descricao: 'd',
            senhaUltraSecreta: 'senha',
            confirmacaoSenhaUltraSecreta: 'senha',
        };

        try {
            new CadastrarHeroiFormObject(heroi);
        } catch (err) {
            expect(err).toBeInstanceOf(ValidationError);
            expect(err.errors).toEqual(expect.arrayContaining([
                "nomeReal must be at least 3 characters", 
                "descricao must be at least 10 characters", 
                "senhaUltraSecreta must be at least 6 characters", 
                "confirmacaoSenhaUltraSecreta must be at least 6 characters"
            ]));
        }
    });

    it ('deve gerar a entidade', () => {
        
        const nome = faker.internet.userName();
        const nomeReal = faker.name.findName();
        const descricao = faker.lorem.words(10);
        const senha = faker.internet.password(6);

        const heroi = {
            nome,
            nomeReal,
            descricao,
            senhaUltraSecreta: senha,
            confirmacaoSenhaUltraSecreta: senha,
        };

        const cadastrarHeroiFormObject = new CadastrarHeroiFormObject(heroi);
        const heroiEntity = cadastrarHeroiFormObject.toEntity();

        expect(heroiEntity).toMatchObject({
            nome, nomeReal, descricao
        });

        expect(bcrypt.compareSync(senha, heroiEntity.senhaUltraSecreta)).toStrictEqual(true);

    });

    it ('deve validar senhas diferentes', () => {
        
        const heroi = {
            nome: faker.internet.userName(),
            nomeReal: faker.name.findName(),
            descricao: faker.lorem.words(10),
            senhaUltraSecreta: faker.internet.password(6),
            confirmacaoSenhaUltraSecreta: faker.internet.password(6),
        };

        expect(() => {
            new CadastrarHeroiFormObject(heroi);
        }).toThrow(new BusinessException('Senhas são diferentes.', 'HER_01'));

    });
})