const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const config = require('./config');
if (config.env === 'local') {
    AWS.config.dynamodb = {endpoint: 'http://localstack:4569'};
}
const router = require('./router');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    const msg = {
        message: 'Welcome to Soccer Player API!'
    };
    res.status(200).send(msg);
});

app.get('/status', (req, res) => {
    const status = {
        status: 'ok',
        api: 'soccer-player-api',
        time: Date.now()
    };
    res.status(200).send(status);
});

router.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

app.use('/', router);

module.exports = app;
