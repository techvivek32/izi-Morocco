import mongoose from 'mongoose'

const QuestionCommentsSchema = new mongoose.Schema({

    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Questions',
        required:true
    } ,

    hints:{
        type:String ,
        default:null
    } ,

    commentsAfterCorrection:{
        type:Object ,
        default:null
    } ,

    commentsAfterRejection:{
        type:Object ,
        default:null
    }
} , {
    timestamps:true ,
    versionKey:false ,
    collection:'QuestionComment'
    }
)


export default mongoose.model('QuestionComments' , QuestionCommentsSchema)




