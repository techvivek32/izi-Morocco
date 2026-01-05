import 'dotenv/config.js'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

async function main() {
  const adminId = '67707eba29571f4e14a66acf'
  const newPassword = 'Admin@1234'
  try {
    await mongoose.connect(process.env.MONGO_URI)
    const hash = await bcrypt.hash(newPassword, 10)
    const result = await mongoose.connection
      .collection('Users')
      .updateOne(
        { _id: new mongoose.Types.ObjectId(adminId) },
        { $set: { password: hash, loginAttempts: 0, blockExpires: new Date(0) } }
      )
    console.log('Update result:', result.modifiedCount)
  } finally {
    await mongoose.disconnect()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
