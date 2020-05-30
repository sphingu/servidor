import { connect, connection } from 'mongoose'
import { mongoose } from '@typegoose/typegoose'

const LOG = {
  OPENED: 'Connected to database',
  ERROR: (error: Error) => `Connection error : ${error.message}`,
  CONNECT_ERROR: 'MongoDB Connection Error:'
}

const mongoUrl = process.env.MONGODB_URI_LOCAL as string

export default (): mongoose.Connection => {
  connection.on('error', (err) => console.error(LOG.ERROR(err)))
  connection.once('open', () => console.info(LOG.OPENED))

  connect(mongoUrl, {
    //  bufferCommands: false,
    // bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch((e) => {
    console.error(LOG.CONNECT_ERROR, JSON.stringify(e, null, '  '))
  })

  return connection
}
