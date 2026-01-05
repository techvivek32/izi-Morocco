import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['P', "A"], default: 'P' }, // P - Player A - Admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' }

}, {
  collection: 'Players',
  timestamps: true,
  versionKey: false,
})

const Player = mongoose.model('Players', playerSchema)

export default Player