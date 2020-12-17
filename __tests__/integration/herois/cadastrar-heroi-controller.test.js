const faker = require('faker');
const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../../src/app');
const sequelize = require('../../../src/config/db');
const Heroi = require('../../../src/entities/heroi.entity');

describe('Cadastrar herois Controller', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true});
    });

    beforeEach(async () => {
        await Heroi.destroy({truncate: true});
    });

    it('deve cadastrar heroi', async (done) => {

        const senha = faker.internet.password(6);

        const heroi = {
            nome: faker.internet.userName(),
            nomeReal: faker.name.findName(),
            descricao: faker.lorem.words(10),
            senhaUltraSecreta: senha,
            confirmacaoSenhaUltraSecreta: senha,
        };

        request(app)
            .post('/herois')
            .send(heroi)
            .set('Accept', 'application/json')
            .expect(201)
            .end(async (err, res) => {
                if (err) return done(err);

                const heroiCadastrado = await Heroi.findOne({where: {nome: heroi.nome}});
                expect(heroiCadastrado).toMatchObject({
                    nome: heroi.nome,
                    nomeReal: heroi.nomeReal,
                    descricao: heroi.descricao,
                });
                expect(bcrypt.compareSync(heroi.senhaUltraSecreta, heroiCadastrado.senhaUltraSecreta)).toStrictEqual(true);
                
                done();
            });

    });
});