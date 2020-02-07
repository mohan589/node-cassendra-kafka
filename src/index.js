import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import Consumer from './consumer'

const app = express()
app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*')*://localhost:*/*
  // res.header('Access-Control-Allow-Origin', 'https://localhost:9000') //* ://localhost:*/* https://localhost:3888/*
  const origin = whitelist.origin.indexOf(req.header('host').toLowerCase()) > -1 ? req.headers.origin : whitelist.default
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD'])
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const PORT = 5000

app.use(bodyParser.json())
// app.use('/', apiRouter)
export async function init () {
  // logger.info('Starting initialization')
  try {
    const httpServer = http.createServer(app)

    httpServer.listen(PORT, () => {
      console.log(`http server is listening on ${PORT} 🗽`)
      // setInterval(() => new Consumer().checkMessages(), 5000)
      Consumer.connect()
    }).on('error', (err) => {
      // logger.error(err, 'Error initializing express http')
      setTimeout(() => process.exit(1), 5000)
    })
  } catch (err) {
    // logger.error(err, 'Error initializing services')
    setTimeout(() => process.exit(1), 5000)
  }
  // logger.info('Initialization completed')
}

export default app


