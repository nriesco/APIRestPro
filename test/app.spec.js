const request = require("supertest");
const app = require("../app");

var token = '';
var uuid = '';

describe("Test e2e", () => {

    test("prueba de metodo index principal", done => {
        request(app)
            .get("/")
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test('Login exitoso', done => {
        request(app)
            .post('/login')
            .send({
                "usuario": "raicerk",
                "contrasena": "12345"
            })
            .set('Content-Type', 'application/json')
            .then(response => {
                token = response.body.token;
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    test('Login no exitoso', done => {
        request(app)
            .post('/login')
            .send({
                "usuario": "raicerk",
                "contrasena": "111"
            })
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(401);
                done();
            })
    });

    test('crea usuario', done => {
        request(app)
            .post('/usuario')
            .send({
                "usuario": "juan",
                "contrasena": "24500-01",
                "estado": true
            })
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            })
    });

    test('Lista personas', done => {
        request(app)
            .get('/personas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    test('Peticion sin token', done => {
        request(app)
            .get('/personas')
            .set('Content-Type', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(403);
                done();
            })
    });

    test('Peticion con token invalido', done => {
        request(app)
            .get('/personas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer 1234`)
            .then(response => {
                expect(response.statusCode).toBe(403);
                done();
            })
    });

    test('Peticion con token con formato invalido', done => {
        request(app)
            .get('/personas')
            .set('Content-Type', 'application/json')
            .set('Authorization', `1234`)
            .then(response => {
                expect(response.statusCode).toBe(403);
                done();
            })
    });

    test('Agregar persona', done => {
        request(app)
            .post('/personas')
            .send({
                "nombre": "Claudio",
                "apellido": "Fuentes",
                "telefono": "+56964890839"
            })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                uuid = response.body.persona.uuid;
                expect(response.statusCode).toBe(201);
                done();
            })
    });

    test('Obtiene una persona', done => {
        request(app)
            .get(`/personas/${uuid}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    test('Actualizar persona', done => {
        request(app)
            .put(`/personas/${uuid}`)
            .send({
                "nombre": "CLaudillio",
                "apellido": "Fuentesillo",
                "telefono": "+56964564789"
            })
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    });

    test('Borrar persona', done => {
        request(app)
            .delete(`/personas/${uuid}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            })
    });

});
