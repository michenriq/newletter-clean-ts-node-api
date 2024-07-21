import express from 'express'
import setupMiddleware from '@/main/middleware'

const app = express()
setupMiddleware(app)

export default app
