const path = require('path');
const express = require('express');
const lambdaLocal = require('lambda-local');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('listening on port: 3000'));

const selfResult = (pathLambda = "", req = {}) => {
    return {
        lambdaPath: path.join(__dirname, pathLambda),
        lambdaHandler: 'handler',
        envfile: path.join(__dirname, '.env'),
        event: req.body
    }
};

app.get('/users', async (req, res) => {
    const result = await lambdaLocal.execute(selfResult("/UserShow/index", req));
    res.status(result.statusCode).set(result.headers).json(result.body);
});

app.post('/users', async (req, res) => {
    const result = await lambdaLocal.execute(selfResult("/UserCreate/index", req));
    res.status(result.statusCode).set(result.headers).json(result.body);
});

app.put('/users', async (req, res) => {
    const result = await lambdaLocal.execute(selfResult("/UserUpdate/index", req));
    res.status(result.statusCode).set(result.headers).json(result.body);
});

app.delete('/users', async (req, res) => {
    const result = await lambdaLocal.execute(selfResult("/UserDelete/index", req));
    res.status(result.statusCode).set(result.headers).json(result.body);
});
