import 'dotenv/config.js'
import mongoose from 'mongoose'
import UserGroups from './api/models/user-group.schema.js'
import Role from './api/models/role.schema.js'

const seedUserGroups = async () => {
  try {
    console.log('Seeding user groups with access levels...')

    const userGroups = [
      {
        name: 'Super Administrators',
        description: 'Root access - can manage all users and system settings',
        accessLevel: 'root'
      },
      {
        name: 'Administrators',
        description: 'Edit access - can manage content and groups but not users',
        accessLevel: 'edit'
      },
      {
        name: 'Viewers',
        description: 'View only access - can view content but not modify anything except users',
        accessLevel: 'view'
      }
    ]

    for (const groupData of userGroups) {
      await UserGroups.findOneAndUpdate(
        { name: groupData.name },
        groupData,
        { upsert: true, new: true }
      )
      console.log(`✓ Created/Updated group: ${groupData.name}`)
    }

    // Ensure required roles exist
    const roles = [
      { role: 'super-admin', label: 'Super Administrator' },
      { role: 'admin', label: 'Administrator' },
      { role: 'user', label: 'User' }
    ]

    for (const roleData of roles) {
      await Role.findOneAndUpdate(
        { role: roleData.role },
        roleData,
        { upsert: true, new: true }
      )
      console.log(`✓ Created/Updated role: ${roleData.role}`)
    }

    console.log('User groups and roles seeded successfully!')

  } catch (error) {
    console.error('Error seeding user groups:', error)
    throw error
  }
}

// Main execution
const main = async () => {
  try {
    const mongoURI = process.env.MONGO_URI
    await mongoose.connect(mongoURI)
    console.log('Connected to MongoDB')

    await seedUserGroups()

    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('Seeding failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
    process.exit(0)
  }
}

main()
