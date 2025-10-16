const request = require('supertest');
const app = require('./server');

describe('Health Check', () => {
  it('should return OK status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('OK');
  });
});