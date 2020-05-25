import { connect, connection } from 'mongoose'

const mongoHost = 'mongodb://localhost:27017/servidor'
export default (): void => {
  connect(mongoHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test'
  }).catch((e) => {
    console.error('MongoDB Connection Error:')
    console.error(JSON.stringify(e, null, '  '))
  })
  connection.on('error', (err) => {
    console.error(`Connection error: ${err.message}`)
  })
  connection.once('open', () => {
    console.info('Connected to database')
  })
}
