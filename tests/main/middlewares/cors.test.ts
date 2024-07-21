import app from '../../../src/main/config/app'
import request from 'supertest'

describe('Cors middleware', () => {
  test('should apply cors rules to the request', async () => {
    app.post('/test_cors', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-headers', '*')
      .expect('access-control-methods', '*')
  })
})
