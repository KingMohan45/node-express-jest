import request from 'supertest';
import { Sequelize } from 'sequelize';
import { app } from './conf';
import { loadModels } from './models/index.js';
import {UserModel} from './models/user.js';
const sequelize = new Sequelize(
    'sqlite::memory:',
    // we can use 'sqlite:/path/to/your/database.db' to use file database
);
loadModels(sequelize)

describe('Health Check', () => {
  test('GET /health - It should return server status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is up and running!');
  });
});

describe('SQL Functionality', () => {
  beforeAll(async () => {
    await sequelize.sync();
    await UserModel.bulkCreate([
      { name: 'Alice' },
      { name: 'Bob' },
    ]);
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  test('GET /api/users - It should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe('Alice');
    expect(response.body[1].name).toBe('Bob');
  });

  test('POST /api/users - It should create a new user', async () => {
    const response = await request(app).post('/api/users').send({ name: 'Charlie' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Charlie');
  });
});
