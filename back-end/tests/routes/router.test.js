const request = require('supertest');
const app = require('../../app');
const http = require('http');

const port = 3000;
let server = http.createServer(app);

beforeAll((done) => {
    server.listen({ port }, done)
});

afterAll(() => {
    return server.close();
});

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(server).get('/').expect(200);
    });
});

describe('Test the /api/books/list path', () => {
    test('It should response the GET method', () => {
        return request(server).get('/api/books/list').expect(200);
    });
    test('It should return 404 with the POST method', () => {
        return request(server).post('/api/books/list').expect(404);
    });
    test('It should return 404 with the PUT method', () => {
        return request(server).put('/api/books/list').expect(404);
    });
});

describe('Test the /api/books/addBook path', () => {
    test('It should return 404 with the GET method', () => {
        return request(server).get('/api/books/addBook').expect(404);
    });
    test('It should return 404 with the PUT method', () => {
        return request(server).put('/api/books/addBook').expect(404);
    });
});
