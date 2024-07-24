import app from '@/main/config/app'
import request from 'supertest'

describe('Register route', () => {
  test('should return an account on success', async () => {
    app.post('test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .post('/api/register')
      .send({
        name: 'Michel',
        email: 'michel@mail.com'
      })
      .expect(201)
  })
})
