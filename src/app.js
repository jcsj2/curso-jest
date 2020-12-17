const express = require('express');
require('express-async-errors');
const { ValidationError } = require('yup');

const BusinessException = require('./common/errors/business-exception.error');
const heroisRouter = require('./routes/herois.route');

const app = express();
app.use(express.json());

app.use('/herois', heroisRouter);

app.use((err, req, res, next) => {
    if (err instanceof BusinessException) {
        const errorDetail = {
        detail: [err.message],
        code: err.code,
        dateTime: new Date().toISOString(),
        };

        //BAD_REQUEST
        res.status(400).json(errorDetail);
    } else if (err instanceof ValidationError) {
        const errorDetail = {
        detail: err.errors,
        dateTime: new Date().toISOString(),
        };

        //BAD_REQUEST
        res.status(400).json(errorDetail);
    } else {
        //INTERNAL_SERVER_ERROR
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = app;