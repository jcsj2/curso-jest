const faker = require('faker');
const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../../../src/app');
const sequelize = require('../../../src/config/db');
const Heroi = require('../../../src/entities/heroi.entity');

describe('Listar herois Controller', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true});
    });

    beforeEach(async () => {
        await Heroi.destroy({truncate: true});
    });

    it('deve listar herois', async (done) => {
        
        const herois = [];

        for (let i = 0; i < 5; i++) {
            herois.push({
                nome: faker.internet.userName(),
                nomeReal: faker.name.findName(),
                descricao: faker.lorem.words(10),
                senhaUltraSecreta: faker.internet.password(6)
            });
        }

        await Heroi.bulkCreate(herois);

        request(app)
            .get('/herois')
            .set('Accept', 'application/json')
            .expect(200)
            .end(async (err, res) => {
                if (err) return done(err);

                const { body } = res;

                expect(body).toMatchObject({
                    herois
                });
                done();
            });
    });
});