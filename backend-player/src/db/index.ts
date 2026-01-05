import config from '../config'
import mongoose from 'mongoose'
import loadModels from './helper/loadModals'

const mongoURL = config.mongodb.MONGO_URI

mongoose
  .connect(mongoURL)
  .then(() => {
    loadModels()
    console.log('mongoDb Connected')
  })
  .catch((e) => {
    console.log(e)
  })

const mongoDB = mongoose.connection

export default mongoDB
