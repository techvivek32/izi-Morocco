import mongoose from 'mongoose'



const UserGroupAssignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserGroups',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'UserGroupAssignments',
    versionKey: false,
  }
)

UserGroupAssignmentSchema.index({ userId: 1, groupId: 1 }, { unique: true })

export default mongoose.model('UserGroupAssignments', UserGroupAssignmentSchema)