const app = require('./app');
const sequelize = require('./config/db');

sequelize.sync({alter: true});

app.listen(3000, () => console.log('Servidor iniciou na porta 3000'))