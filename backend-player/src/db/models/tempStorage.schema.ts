import mongoose, { Schema } from 'mongoose'

const TempStorageSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    count: { type: Number, default: 1 }, // number of attempts
    expiresAt: { type: Date, required: true } // calculated from createdAt + expiresIn
  },
  { timestamps: true, collection: 'TempStorage', versionKey: false }
)

// TTL index: MongoDB will automatically delete the document when expiresAt <= now
TempStorageSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

TempStorageSchema.pre('validate', function (next) {
  if (!this.expiresAt) {
    // Default TTL: 5 minutes
    this.expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  }
  next()
})

const TempStorage = mongoose.model('tempStorage', TempStorageSchema)

export default TempStorage
