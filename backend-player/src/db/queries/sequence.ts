import { MongoClient } from 'mongodb'
import config from '../../config'

const collectionName = 'sequenceManager'

export const getCollection = (mongoDB: MongoClient) =>
  mongoDB.db(config.mongodb.DB_NAME).collection(collectionName)

export type SequenceName = 'user'

export const getDefaultPrefix = (field: SequenceName): string => {
  switch (field) {
    case 'user':
      return 'VS' // Vaishnav Setu

    default:
      throw new Error(`Unknown sequence field: ${field}`)
  }
}

export const getId = async (
  mongoDB: MongoClient,
  field: SequenceName
): Promise<number> => {
  const sequenceData = await getCollection(mongoDB).findOneAndUpdate(
    { name: field },
    {
      $inc: { sequenceValue: 1 },
      $setOnInsert: {
        prefix: getDefaultPrefix(field),
        createdAt: new Date()
      }
    },
    { returnDocument: 'after', upsert: true }
  )

  return sequenceData?.sequenceValue || 1
}
