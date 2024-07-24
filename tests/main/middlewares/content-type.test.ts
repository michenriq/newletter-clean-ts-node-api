import app from '@/main/config/app'
import request from 'supertest'

describe('Content-type middleware', () => {
  test('should receive data as json', async () => {
    app.post('/test_json_type', (req, res) => {
      res.type('json')
      res.send('')
    })

    await request(app).post('/test_json_type').expect('content-type', /json/)
  })

  test('should receive data as xml', async () => {
    app.post('/test_xml_type', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app).post('/test_xml_type').expect('content-type', /xml/)
  })
})
