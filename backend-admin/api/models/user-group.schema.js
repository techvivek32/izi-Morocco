import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const UserGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    description: {
      type: String,
      default: null,
      trim: true
    },
    accessLevel: {
      type: String,
      required: true,
      enum: ['root', 'edit', 'view'],
      default: 'view',
      index: true
    }

  },
  {
    timestamps: true,
    collection: 'UserGroups',
    versionKey: false
  }
)


export default mongoose.model('UserGroups', UserGroupSchema)