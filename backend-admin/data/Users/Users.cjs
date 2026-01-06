const mongoose = require('mongoose')

module.exports = [
  {
    _id: new mongoose.Types.ObjectId('67707eba29571f4e14a66acf'),
   
    fullName: 'Super admin',
    email: 'super@admin.com',
    password: '$2b$10$pl0/KgcX2QGcrw4MO1sWe.PPcnM5qqVRjSy.fD6aCyrat7rn1dpR2',
    blockExpires: new Date('2024-10-16T00:00:00.000Z'),
    loginAttempts: 0,
    roleId: new mongoose.Types.ObjectId('670fbc699aedcfcb302862ce'),
    createdAt: new Date('2024-10-16T00:00:00.000Z'),
    updateAt: new Date('2024-10-16T00:00:00.000Z'),
  },
]
