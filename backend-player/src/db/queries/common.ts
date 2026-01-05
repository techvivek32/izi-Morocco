import MongoDB, { Collection, Document, MongoClient } from 'mongodb'

type GetCollectionFn = (mongoDB: MongoClient) => Collection

// ---------- Count ----------

export const countDocuments = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object
): Promise<number> => getCollection(mongoDB).countDocuments(condition)

// ---------- Create ----------

export const createDocument = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  data: object
) => getCollection(mongoDB).insertOne(data)

export const createDocuments = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  data: object[]
) => getCollection(mongoDB).insertMany(data)

// ---------- Read ----------

export const findDocument = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object,
  attributes: object = {}
) =>
  getCollection(mongoDB).findOne(condition, {
    projection: { ...attributes }
  })

export const findDocuments = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object,
  attributes: object = {},
  sortByObject: Document = {}
): Promise<Document[]> =>
  getCollection(mongoDB)
    .find(condition, {
      projection: {
        ...attributes
      }
    })
    .sort(sortByObject)
    .toArray()

// ---------- Update ----------

export const updateDocument = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  where: object,
  updateObj: object,
  options?: object
) => getCollection(mongoDB).updateOne(where, updateObj, options)

export const updateDocuments = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  where: object,
  updateObj: object,
  options?: object
) => getCollection(mongoDB).updateMany(where, updateObj, options)

// ---------- Delete ----------

export const deleteDocument = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object
) => getCollection(mongoDB).deleteOne(condition)

export const deleteDocuments = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object
) => getCollection(mongoDB).deleteMany(condition)

// ---------- List ----------

export const list = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  condition: object,
  limit: number,
  page: number,
  sortByObject: object,
  attributes: object = {}
) =>
  getCollection(mongoDB)
    .aggregate(
      [
        {
          $facet: {
            data: [
              {
                $match: condition
              },
              {
                $project: {
                  _id: 0,
                  ...attributes
                }
              },
              {
                $sort: {
                  ...sortByObject
                }
              },
              { $skip: (page - 1) * limit },
              { $limit: limit }
            ],
            total: [{ $match: condition }, { $count: 'count' }]
          }
        }
      ],
      { collation: { locale: 'en', caseLevel: false } }
    )
    .toArray()

export const distinct = (
  getCollection: GetCollectionFn,
  mongoDB: MongoDB.MongoClient,
  fieldName: string,
  condition: object
) => getCollection(mongoDB).distinct(fieldName, condition)
