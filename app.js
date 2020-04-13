const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const secure = require('./utils/security');

const user = require('./controller/usuario.controller');
const person = require('./controller/persona.controller');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: "API Rest para Claudio"
    })
});

app.post('/usuario', user.add);
app.post('/login', user.login);

app.post('/personas', secure.protegida, person.add);
app.get('/personas', secure.protegida, person.get);
app.put('/personas/:uuid', secure.protegida, person.update);
app.delete('/personas/:uuid', secure.protegida, person.delete);
app.get('/personas/:uuid', secure.protegida, person.getOne);

module.exports = app;
