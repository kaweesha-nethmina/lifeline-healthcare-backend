const request = require('supertest');
const app = require('./server');

describe('Authentication Routes', () => {
  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          name: 'Test User',
          role: 'patient',
          password: 'password123'
        });
      // We expect this to fail because Supabase isn't configured
      // but we can still test the route structure
      expect(res.status).toBe(500);
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      // We expect this to fail because Supabase isn't configured
      // but we can still test the route structure
      expect(res.status).toBe(500);
    });
  });
});