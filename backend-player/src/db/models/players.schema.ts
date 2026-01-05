import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema(
  {
    playerId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['P'], default: 'P' }, // P - Player
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    profilePicture: { type: String, default: '' }
  },
  {
    collection: 'Players',
    timestamps: true,
    versionKey: false
  }
)

const Player = mongoose.model('Players', playerSchema)

export default Player
