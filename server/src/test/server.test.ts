import request from 'supertest';
import app from '../app';


describe('Backend API Tests', () => {
  it('GET /assets should return all assets', async () => {
    const response = await request(app).get('/assets');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('POST /assets should create a new asset', async () => {
    const newAsset = { name: 'Car', price: 20000, currency: '€' };
    const response = await request(app).post('/assets').send(newAsset);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Car');
    expect(response.body.currency).toBe('€');
  });

  it('PATCH /assets/:id should update an asset', async () => {
    const updatedAsset = { name: 'Updated Car', price: 25000 };
    const response = await request(app).patch('/assets/1').send(updatedAsset);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Car');
  });

  it('DELETE /assets/:id should delete an asset', async () => {
    const response = await request(app).delete('/assets/1');
    expect(response.status).toBe(204);
  });
});
