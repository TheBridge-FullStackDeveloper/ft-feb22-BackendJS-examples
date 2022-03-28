const server = require('../index'); // lanza servidor
const supertest = require('supertest');
const mongoose = require('../utils/dbMongo') // lanza la bbdd
const request = supertest(server)

afterAll( async () => {
  await server.close()
  await mongoose.connection.close()
})

it('Probando jest', () => {
    expect(1).toBe(1)
})
describe('GET all products', () => {
  it('gets the test endpoint /',  async() => {
      await request
          .get('/api/products')
          .expect(200)
  })
  //...
  //otros tests GET /
  //...
})
describe('GET one product', () => {
  it('dame un producto en concreto', async () => {
    const response = await request
                      .get('/api/products/1')
                      .expect(200)
  })
})
describe('POST one product', () => {
  it('Se envia un producto', done => {
    request
      .post('/api/products?api_key=123456')
      .send(
        {
            "id": 999,
            "title": "test product desde Thunderclient",
            "price": 13.5444,
            "description": "lorem ipsum set",
            "image": "https://i.pravatar.jpg"
            }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err,res)=>{
          if (err) return done(err)
          return done()
      })
  })
})