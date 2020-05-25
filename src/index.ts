import express from 'express'
import bodyParser from 'body-parser'

import connectDatabase from './db'
import UserModel, { User } from './models/user'

const app: express.Application = express()

app.use(bodyParser.json())

connectDatabase()

app.get('/', async function (req, res) {
  new UserModel({
    name: 'Sumit',
    description: 'my Description'
  } as User).save()

  const user = await UserModel.findOne()
  console.log(user) // { _id
  res.send('Hello from servidor app!')
})

app.listen(3000, function () {
  console.log('servidor App is listening on port 3000!')
})
