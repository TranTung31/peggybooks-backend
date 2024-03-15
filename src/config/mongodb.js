import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let bookDatabaseInstance = null

const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  bookDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!bookDatabaseInstance) throw new Error('Must connect to Database first!')
  return bookDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}