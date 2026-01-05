import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase:true
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    roleId:{
      type:mongoose.Schema.Types.ObjectId ,
      ref:'Roles' ,
      required:true 
    } ,

    loginAttempts:{
      type:Number , default:0
    } ,
    blockExpires: {
      type: Date,
      default: new Date(), 
      select: false }
    ,
    phoneNumber:{
      type:String , 
    }
  },

 
  { timestamps: true, collection: 'Users' } )





export default mongoose.model('User', UserSchema)
