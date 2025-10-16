const request = require('supertest');
const app = require('./server');

describe('Lifeline Smart Healthcare System API', () => {
  it('should return welcome message on root route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Lifeline Smart Healthcare System API');
  });
});